const number = document.querySelectorAll(".number");
const clearButton = document.querySelector("#reset");
const decimalButton = document.querySelector("#decimal");
const resultButton = document.querySelector("#result");
const operatorButtons = document.querySelectorAll(".operator");
const negativeButton = document.querySelector("#negative");
const displayCalculator = document.querySelector("#display-value");

let lastResult = '';
let currentValue = '';
let currentInput = '';
let decimalClicked = false;
let operatorClicked = false;

function insert(value) {
    if (value === ".") {
        if (!decimalClicked && !currentValue.includes('.')) {
            currentValue += value;
            decimalClicked = true;
            operatorClicked = false;
            decimalButton.disabled = true;
            displayCalculator.innerHTML += value;
        }
    } else {
        currentValue += value;
        displayCalculator.innerHTML += value;

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
            decimalButton.disabled = false;
            currentValue = '';
            currentInput.number = '';

            currentLength = displayCalculator.innerHTML.length;
        } else {
            operatorButtons.forEach(button => button.disabled = false);
            negativeButton.disabled = false;
            operatorClicked = false;
        }
    }
}

window.addEventListener('keydown', function (event) {
    if (
        (event.key >= '0') &&
        (event.key <= '9')
    ) {
        insert(event.key);
    } else if (event.key === '.') {
        if (!decimalClicked) {
            if (displayCalculator.innerHTML === '') {
                displayCalculator.innerHTML = '0.';
            } else if (displayCalculator.innerHTML.slice(-1) === '+' ||
                displayCalculator.innerHTML.slice(-1) === '-' ||
                displayCalculator.innerHTML.slice(-1) === '/' ||
                displayCalculator.innerHTML.slice(-1) === '*') {
                displayCalculator.innerHTML += '0.';
            } else {
                displayCalculator.innerHTML += ".";
            }
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
            operatorButtons.forEach(button => button.disabled = true); // Desativa os botões de operadores
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
    operatorButtons.forEach(button => button.disabled = true);
    negativeButton.disabled = true;
    decimalButton.disabled = false;
    operatorClicked = false;
    decimalClicked = false;
}

function backspace() {
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        let num = displayElement.innerHTML;
        num = num.slice(0, -1);
        currentValue = num;
        displayElement.innerHTML = num;

        if (num.slice(-1) !== '.') {
            decimalClicked = false;
        }

        operatorButtons.forEach(button => button.disabled = false);
        negativeButton.disabled = false;
        operatorClicked = false;
    }
}

function calculateResult() {
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

        currentInput = { number: parseFloat(displayCalculator.innerHTML) };
        currentValue = displayCalculator.innerHTML;
        operatorClicked = false;
        decimalClicked = false;
    }
    operatorButtons.forEach(button => button.disabled = false);
    negativeButton.disabled = false;
    decimalButton.disabled = true;
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

function negative() {
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        let num = currentValue;
        num = num * (-1);
        currentValue = num;
    }
}