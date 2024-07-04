function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;
let historyValue = '';

const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.id === 'clear') {
            clear();
        } else if (button.id === 'backspace') {
            backspace();
        } else if (button.id === 'equals') {
            evaluate();
        } else if (button.dataset.operator) {
            setOperator(button.dataset.operator);
        } else if (button.dataset.number) {
            inputNumber(button.dataset.number);
        }

        updateDisplay();
    });
});

function updateDisplay() {
    display.textContent = displayValue;
    history.textContent = historyValue;
}

function clear() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    historyValue = '';
}

function backspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
}

function inputNumber(number) {
    if (shouldResetDisplay) {
        displayValue = number;
        shouldResetDisplay = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    historyValue += number;
}

function setOperator(operator) {
    if (currentOperator !== null) {
        evaluate();
    }
    firstOperand = parseFloat(displayValue);
    currentOperator = operator;
    shouldResetDisplay = true;
    historyValue += ` ${operator} `;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) {
        return;
    }
    secondOperand = parseFloat(displayValue);
    const operationHistory = `${firstOperand} ${currentOperator} ${secondOperand}`;
    const result = operate(currentOperator, firstOperand, secondOperand);
    displayValue = result.toString().substring(0, 15);
    historyValue = `${operationHistory} = ${result}`;
    currentOperator = null;
    shouldResetDisplay = true;
}
