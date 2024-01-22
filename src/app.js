const number = document.querySelectorAll(".number");
const clearButton = document.querySelector("#reset");
const decimalButton = document.querySelector("#decimal");
const resultButton = document.querySelector("#result");
const operatorButtons = document.querySelectorAll(".operator");
const negativeButton = document.querySelector("#negative");
const displayCalculator = document.querySelector("#display-value");

let currentValue = ' ';
let decimalClicked = false;
let operatorClicked = true;
let lastresult = null;
let currentLength = displayCalculator.innerHTML.length;

decimalButton.disabled = true

function insert(value) {
        if (value === ".") {
            if (!decimalClicked && !displayCalculator.innerHTML.endsWith(".")) {
                displayCalculator.innerHTML += value;
                decimalClicked = true;
            }
        } else {
            displayCalculator.innerHTML += value;
            decimalClicked = false;
        }

        if (
            (value === "+") ||
            (value === "-") ||
            (value === "/") ||
            (value === "*")
        ) {
            operatorButtons.forEach(button => button.disabled = true);
            negativeButton.disabled = true;
            operatorClicked = true;
            decimalClicked = false;
            decimalButton.disabled = true;

            currentLength = displayCalculator.innerHTML.length;
        } else {
            operatorButtons.forEach(button => button.disabled = false);
            negativeButton.disabled = false;
            operatorClicked = false;
            decimalButton.disabled = false
        }

        currentLength = displayCalculator.innerHTML.length;
}

window.addEventListener('keydown', function (event) {
    if (
        (event.key >= '0') &&
        (event.key <= '9')
    ) {
        insert(event.key);
    } else if (event.key === '.') {
        if (!decimalClicked) {
            displayCalculator.innerHTML += ".";
            decimalClicked = true;
        }
    } else if (
        (event.key === '+') ||
        (event.key === '-') ||
        (event.key === '*') ||
        (event.key === '/')
    ) {
        if (!operatorClicked) {
            displayCalculator.innerHTML += event.key;
            operatorButtons.forEach(button => button.disabled = true);
            negativeButton.disabled = true;
            operatorClicked = true;
            decimalClicked = false;
            decimalButton.disabled = true;
        }
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Enter') {
        calculateResult();
    } else if (
        (event.key === 'Escape') ||
        (event.key === 'c')
    ) {
        reset();
    }
});

function reset() {
    displayCalculator.innerHTML = "";
    operatorButtons.forEach(button => button.disabled = false);
    negativeButton.disabled = false;
    decimalButton.disabled = true;
    operatorClicked = false;
    decimalClicked = false;
}

function backspace() {
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        let num = displayElement.innerHTML;
        num = num.slice(0, -1);
        displayElement.innerHTML = num;
        operatorButtons.forEach(button => button.disabled = false);
        negativeButton.disabled = false;
        decimalButton.disabled = false;
        operatorClicked = false;
        decimalClicked = true;
    }
}

function calculateResult(){
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        if (displayElement.innerHTML.trim() === '') {
            displayCalculator.innerHTML = lastResult || '';
        } else {
            let result = evalExpression(displayElement.innerHTML);
            let formattedResult = formatNumber(result);
            displayCalculator.innerHTML = formattedResult;
            lastResult = formattedResult;
        }
    }
}

function formatNumber(number) {
    let formattedNumber = parseFloat(number).toFixed(2);
    if (
        (formattedNumber.includes('.')) &&
        (formattedNumber.split('.')[1] === '00')
    ) {
        formattedNumber = formattedNumber.split('.')[0];
    }

    return formattedNumber;
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