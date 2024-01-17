const displayCalculadora = document.querySelector("#display-value");
const clearButton = document.querySelector("#reset");
const percentageButton = document.querySelector("#porcentagem");
const negativeButton = document.querySelector("#negativo");
const decimalButton = document.querySelector("#virgula");
const resultButton = document.querySelector("#resultado");
const number = document.querySelectorAll(".number");
const operadores = document.querySelectorAll(".operador");

let currentValue = ' ';
let operadorClicado = false;

function insert(value) {
    displayCalculadora.innerHTML += value;
    if (
        (value === "+") ||
        (value === "-") ||
        (value === "/") ||
        (value === "*")
    ) {
        operadores.forEach(button => button.disabled = true);
        negativeButton.disabled = true;
        operadorClicado = true;
    } else {
        operadores.forEach(button => button.disabled = false);
        negativeButton.disabled = false;
        operadorClicado = false;
    }
}


function reset() {
    displayCalculadora.innerHTML = "";
    operadores.forEach(button => button.disabled = false);
    negativeButton.disabled = false;
    decimalButton.disabled = false;
    operadorClicado = false;
    pontoClicado = false;
}

function backspace() {
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        let num = displayElement.innerHTML;
        num = num.slice(0, -1);
        displayElement.innerHTML = num;
        operadores.forEach(button => button.disabled = false);
        negativeButton.disabled = false;
        decimalButton.disabled = false;
        operadorClicado = false;
        pontoClicado = false;
    }
}

function resultado() {
    calculateResult();
}

function calculateResult() {
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        displayCalculadora.innerHTML = evalExpression(displayElement.innerHTML);
    }
}

function evalExpression(expression) {
    try {
        return eval(expression);
    } catch (error) {
        return "Erro";
    }
}

function negativo() {
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        let num = displayElement.innerHTML;
        num = num * (-1);
        displayElement.innerHTML = num;
    }
}

function porcentagem() {
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        let currentValue = displayElement.innerHTML;
        let newValue = eval(currentValue + "* 0.01");
        displayCalculadora.innerHTML = newValue;
    }
}