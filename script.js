const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
)

const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Food', amount: -100 },
    { id: 3, text: 'Salary', amount: 400 },
    { id: 4, text: 'Gift', amount: 100 },
    { id: 5, text: 'Shopping', amount: -200 }
]

let transactions = localStorage.getItem('transactions') != null ? localStorageTransactions : [];

function addTransactionDOM(transaction) {
    const sign = transaction.amount > 0 ? '+' : '-';
    const item = document.createElement(`li`);
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');
    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `

    list.appendChild(item);
}

function removeTransaction(id) {
    transactions = transactions.filter(tx => tx.id !== id);
    updateLocalStorage();
    init();
}

function updateValues() {
    const amounts = transactions.map(tx => tx.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.innerHTML = `&#8377;${total}`;
    money_plus.innerHTML = `&#8377;${income}`;
    money_minus.innerHTML = `&#8377;${expense}`;
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

function addTransaction(e) {
    e.preventDefault();
    if ((text.value.trim() === '') || amount.value.trim() === '') {
        alert("Please add a text and amount");
    }
    else {
        const tx = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(tx);
        addTransactionDOM(tx);

        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', addTransaction);

init();