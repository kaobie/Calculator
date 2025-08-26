const calculator={
    display:'0',
    currentNumber:null,
    previousNumber:null,
    operation:null,
    waitingForOperand:false,
    justCalculated:false
}


const inputNumber=(num)=>{
    if(calculator.waitingForOperand){
        calculator.display=String(num);
        calculator.waitingForOperand=false;
        calculator.justCalculated=false;    
    }
    else{
        calculator.display=calculator.display==="0" ? String(num) : calculator.display + num;
    }
}
const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(calculator.display);

    if(calculator.previousNumber === null){
        calculator.previousNumber = inputValue;
    }
    else if(calculator.operation){
        const currentValue = calculator.previousNumber || 0;
        const newValue = performCalculation(calculator.operation, currentValue, inputValue);

        calculator.display = String(newValue);
        calculator.previousNumber = newValue;
    }
    
    // These lines were outside the function:
    calculator.waitingForOperand = true;
    calculator.operation = nextOperation;
}

const performCalculation = (operation, firstOperand, secondOperand) => {
    switch(operation) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return secondOperand !== 0 ? firstOperand / secondOperand : 0;
        default:
            return secondOperand;
    }
}

const calculate=()=>{
    const inputValue=parseFloat(calculator.display);

    if(calculator.operation && calculator.previousNumber !== null){
        const newNumber=performCalculation(calculator.operation,calculator.previousNumber,inputValue);

        calculator.display=String(newNumber);
        calculator.operation=null;
        calculator.previousNumber=null;
        calculator.waitingForOperand=true;
        calculator.justCalculated=true;
    }
}

function updateDisplay() {
    document.getElementById('display').value = calculator.display;
}

function clearCalculator() {
    calculator.display = '0';
    calculator.previousNumber = null;
    calculator.operation = null;
    calculator.waitingForOperand = false;
    calculator.justCalculated = false;
    updateDisplay();
}

function inputDecimal() {
    if (calculator.waitingForOperand) {
        calculator.display = '0.';
        calculator.waitingForOperand = false;
    } else if (calculator.display.indexOf('.') === -1) {
        calculator.display += '.';
    }
    updateDisplay();
}

// Initialize display when page loads
updateDisplay();





// Test complete calculation
console.log("\nTesting complete calculation: 5 + 3 = ?");
inputNumber(5);
inputOperation('+');
inputNumber(3);
console.log("Before equals:", calculator);
calculate();
console.log("After equals:", calculator);