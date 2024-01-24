const number = document.querySelectorAll(".number");
const clearButton = document.querySelector("#reset");
const resultButton = document.querySelector("#result");
const decimalButton = document.querySelector("#decimal");
const operatorButtons = document.querySelectorAll(".operator");
const displayCalculator = document.querySelector("#display-value");

let lastResult = '';
let currentValue = '';
let decimalClicked = false;
let operatorClicked = false;
let teste = '';

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
            teste = value;
            operatorButtons.forEach(button => button.disabled = true);
            operatorClicked = true;
            decimalClicked = false;
            decimalButton.disabled = false;
            currentValue = '';
            currentLength = displayCalculator.innerHTML.length;
        } else {
            operatorButtons.forEach(button => button.disabled = false);
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
                currentValue += event.key;
            } else if (displayCalculator.innerHTML.slice(-1) === '+' ||
                displayCalculator.innerHTML.slice(-1) === '-' ||
                displayCalculator.innerHTML.slice(-1) === '/' ||
                displayCalculator.innerHTML.slice(-1) === '*') {
                displayCalculator.innerHTML += '0.';
                currentValue += event.key;
            } else {
                displayCalculator.innerHTML += ".";
                currentValue += event.key;
            }
            decimalClicked = true;
        }
    } else if (
        (event.key === '+') ||
        (event.key === '-') ||
        (event.key === '*') ||
        (event.key === '/')
    ) {
        teste = event.key
        currentValue = '';
        if (!operatorClicked) {
            displayCalculator.innerHTML += event.key;
            operatorButtons.forEach(button => button.disabled = true); // Desativa os botões de operadores
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
        operatorClicked = false;
    }
}

function calculateResult() {
    let displayElement = document.getElementById('display-value');
    if (displayElement) {
        if (!hasOperator(displayCalculator.innerHTML)) {
            let result = evalExpression(lastResult+teste+currentValue);
            let formattedResult = formatNumber(result);
            displayCalculator.innerHTML = formattedResult;
            lastResult = formattedResult;
        } else {
            let result = evalExpression(displayElement.innerHTML);
            let formattedResult = formatNumber(result);
            displayCalculator.innerHTML = formattedResult;
            lastResult = formattedResult;
        }
        operatorClicked = false;
        decimalClicked = false;
    }
    operatorButtons.forEach(button => button.disabled = false);
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

function hasOperator(str) {
    const operators = ['+', '-', '*', '/'];
    for (let i = 0; i < str.length; i++) {
        if (operators.includes(str[i])) {
            return true;
        }
    }
    return false;
}