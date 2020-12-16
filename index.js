class Calculator{
    constructor(previousOperandTextValue, currentOperandTextValue){
        this.previousOperandTextValue = previousOperandTextValue;
        this.currentOperandTextValue = currentOperandTextValue;
        this.clear()
    }
    clear(){
        this.currentOperand =  ""
        this.previousOperand = ""
        this.operation = null
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if(this.currentOperand === ""){
            this.previousOperand = this.previousOperand.toString().slice(0, -1)
            this.operation = this.operation.toString().slice(0, -1)
        }
    }

    appendNumber(number){
        if(number=="." && this.currentOperand.includes(".")) return 
        this.currentOperand += number.toString()
    }

    chooseOperator(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ""){
          this.compute()
        }
 

        this.operation = operation;
        this.previousOperand =this.currentOperand +" " + this.operation;
        this.currentOperand = ""   
    }
 
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        switch(this.operation){
            case "+":
             computation =   prev + current
             break
             case "-":
             computation =   prev - current
             break
             case "÷":
             computation =   prev / current
             break
             case "*":
             computation =   prev * current
             break
            default: return
        }

        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = " "
    }

    getDisplayDigits(number){
       const stringNumber = number.toString();
       const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }
    else{
        integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits: 0
        })
    }
    if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    }
    else {
        return integerDisplay
    }
    }

    updateDisplay(){
        this.currentOperandTextValue.innerText =this.getDisplayDigits(this.currentOperand);
        if(this.operation != null){
        this.previousOperandTextValue.innerText = this.getDisplayDigits(this.previousOperand) + ' '+ this.operation
        }else {
            this.previousOperandTextValue.innerText = ''
        }
    }
}


const numberBtn = document.querySelectorAll(".numbers");
const operationBtn = document.querySelectorAll(".operations");
const allClearBtn = document.querySelector("#all-clear");
const deleteBtn = document.querySelector("#delete-button");
const equalBtn = document.querySelector("#equal-button");
const previousOperandTextValue = document.querySelector(".previous-operand")
const currentOperandTextValue = document.querySelector(".current-operand")
//converts nodelist to arrays
numBtn = Array.from(numberBtn)
operatorBtn = Array.from(operationBtn)


const calculator = new Calculator(previousOperandTextValue, currentOperandTextValue);

numBtn.forEach(button => {
     button.addEventListener("click", ()=>{
         calculator.appendNumber(button.innerText);
         calculator.updateDisplay();
     })    
});

operatorBtn.forEach(button => {
    button.addEventListener("click", ()=>{
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })    
});

equalBtn.addEventListener("click", button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener("click", button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener("click", button=>{
    calculator.delete()
    calculator.updateDisplay()
})