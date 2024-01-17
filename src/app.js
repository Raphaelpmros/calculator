const number = document.querySelectorAll(".number");
const clearButton = document.querySelector("#reset");
const decimalButton = document.querySelector("#virgula");
const resultButton = document.querySelector("#resultado");
const operadores = document.querySelectorAll(".operador");
const negativeButton = document.querySelector("#negativo");
const displayCalculadora = document.querySelector("#display-value");

let currentValue = ' ';
let operadorClicado = false;
let pontoClicado = false; 

function insert(value) {
    if (value === ".") {
        if (!pontoClicado) {
            displayCalculadora.innerHTML += value;
            pontoClicado = true;
        }
    } else {
        displayCalculadora.innerHTML += value;
    }

    if (
        (value === "+") ||
        (value === "-") ||
        (value === "/") ||
        (value === "*")
    ) {
        operadores.forEach(button => button.disabled = true);
        negativeButton.disabled = true;
        operadorClicado = true;
        pontoClicado = false;
        decimalButton.disabled = false;
    } else {
        operadores.forEach(button => button.disabled = false);
        negativeButton.disabled = false;
        operadorClicado = false;
    }
}

window.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
      insert(event.key);
    } else if (event.key === '.') {
      if (!pontoClicado) {
        displayCalculadora.innerHTML += ".";
        pontoClicado = true;
      }
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      if (!operadorClicado) {
        displayCalculadora.innerHTML += event.key;
        operadores.forEach(button => button.disabled = true);
        negativeButton.disabled = true;
        operadorClicado = true;
        pontoClicado = false;
        decimalButton.disabled = false;
      }
    } else if (event.key === 'Backspace') {
      backspace();
    } else if (event.key === 'Enter') {
      resultado();
    } else if (event.key === 'Escape' || event.key === 'c') {
      reset();
    }
  });

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
