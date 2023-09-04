const calculator = {
    displayValue : '0',
    firstOperand : 'null',
    operator : 'null',
    waitingForNextOperand : false,
    firstOperandOver :false,
    secondOperandOver:false,
    result : 0,
    decimal : 'null',
    secondOperand : 0
}

const display = document.querySelector('.calculator-screen');



function onScreen(digit){
    const {displayValue,waitingForNextOperand} = calculator;
    if(waitingForNextOperand == true){
        calculator.secondOperand == 0? calculator.secondOperand = digit:calculator.secondOperand += digit;
        display.value = calculator.secondOperand
        handleOperator(calculator.operator);
    }
    else{
        calculator.displayValue == '0'? calculator.displayValue = digit : calculator.displayValue = displayValue + digit;
        calculator.firstOperand = calculator.displayValue;
        display.value = calculator.displayValue;
        // console.log("inside else " +calculator.firstOperand)
        // console.log("inside else DV" +calculator.displayValue)
        


    }
    console.log("outside else FO" +calculator.firstOperand)

    
}


function handleOperator(nextOperator){

    const{firstOperand , operator , secondOperand , waitingForNextOperand} = calculator;
    if(firstOperand == 'null'){
        return;
    }
    
    if(nextOperator == '='){
        calculate(firstOperand , nextOperator , secondOperand);
    }
    if(firstOperand!='null' && secondOperand !=0){
        
        calculate(firstOperand , operator , secondOperand);
        console.log("returned" +calculator.result)
    }

    else if(firstOperand !='null' && nextOperator){
        
        calculator.waitingForNextOperand = true;
        calculator.operator = nextOperator;
        return;
    }
    function calculate(firstOperand , operator , secondOperand){
        firstOperand=parseInt(firstOperand);
        secondOperand=parseInt(secondOperand);
        if(operator == '+'){
            calculator.result=firstOperand + secondOperand;  
             console.log("1st oper is" + firstOperand)
        }
        if(operator == '-'){
            calculator.result=firstOperand - secondOperand;
        }
        if(operator == '*'){  
            calculator.result=firstOperand * secondOperand;
        }
        if(operator == '/'){      
            calculator.result=firstOperand / secondOperand;
        }
        if(operator == '='){
            display.value = calculator.result;
            
            calculator.firstOperand = calculator.result;
            calculator.secondOperand = 0;
            calculator.displayValue = calculator.firstOperand;
        }
            
    }
    
}

function updateDisplay(){
    calculator.displayValue = '0';
    calculator.firstOperand = 'null';
    calculator.operator = 'null';
    calculator.waitingForNextOperand = false;
    calculator.result = 0;
    calculator.decimal = 'null';
    calculator.secondOperand = 0;
    display.value = "0"
}

const key = document.querySelector('.calculator-keys');
key.addEventListener('click' , event =>{
    const {target} = event;
    const {value} = target;

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            display.value = value;
            handleOperator(value)
            break;
        case 'all-clear':
            updateDisplay()
            break;
        // case '.':
        //     decimalPoint(value)
        //     break;
        default:
            if( !isNaN(value)){
                onScreen(value)
            }
            
    }
})