function handleButton(event){
    // reset and clear display
    if (event.target.value === 'Clear'){
        calcDisplay.innerText = '';
        clearMemory();
        return;
    }

    

    // if an operater is pressed, treat like '=' sign if certain conditions are met
    // To behave more like a calc that are in use, rather than pressing '=' each time.
    if (['+','-','*','/', '='].includes(event.target.value)){


        // clear the decimal memory so new input can have decimal, after each operator press
        calcMemory.decimal = '';


        if (event.target.value === '=' && calcMemory.mem1 && calcMemory.mem2){
            // simple '=' operation
            operate();
            return;
        }
       
        if (!calcMemory.mem1){
            // mem1 not set then store numbers input up to this point and 
            // then clear displayMemory for re-use, keep the input numbers
            // on the display
            calcMemory.mem1 = calcMemory.userInput;
            clearDisplayMemory();


        }else if (calcMemory.mem1 && !calcMemory.mem2){
            // mem2 not set then store numbers input up to this point and 
            // then clear displayMemory for re-use, keep the input numbers
            // on the display

            
            calcMemory.mem2 = calcMemory.userInput;
            clearDisplayMemory();
        }

        if (calcMemory.mem1 && calcMemory.mem2){
            // all conditions met to be able to perform a calculation
            operate();
        }
        
        if (event.target.value !== '='){
            // save the operator to be calculated on next operator or '=' press
            // overwrites previous operator, i.e. if user changes mind on which
            // operator they wished to use for calculation
            calcMemory.operator = event.target.value;
        }

    }else{ 
        // numbers input, keep logging until operator pressed

        if (event.target.value === '.'){
            // only log one decimal
            if (calcMemory.decimal){
                return;
            }else{
                calcMemory.decimal = true;
            }
        }

        calcMemory.userInput += event.target.value;
        updateDisplay(calcMemory.userInput);
    }
}


function operate(){
    // called once calcMemory obj has mem1, mem2 and an operator
    let a = parseFloat(calcMemory.mem1);
    let b = parseFloat(calcMemory.mem2);
    let operator = calcMemory.operator;
    let result;

    switch (operator){
        case '+': 
            result = (a + b).toString();
            break;
        case '-': 
            result =  a - b;
            break;
        case '*': 
            result =  a * b;
            break;
        case '/': 
            result =  a / b;
            break;
        case '=':
            result = a;
            break;
        case null:
            result = a;
            break;
    }

    // clear the calcMemory obj, then store above result to mem1 
    // for future use, update the display with the result
    clearMemory();

    // divide by zero
    if (result === Infinity){
        updateDisplay('Stop Trying To Break My Stuff!');
        return;
    }
    calcMemory.mem1 = result;
    updateDisplay(result);
};

function clearMemory(){
    Object.keys(calcMemory).forEach((i) => calcMemory[i] = '');
}

function clearDisplayMemory(){
    calcMemory.userInput = '';
}

function updateDisplay(text){
    calcDisplay.innerText = text;
}

// init
const calcMemory = {mem1:'', mem2:'', operator:'', userInput:'', decimal:''};
const calcDisplay = document.getElementById('calculation');

window.onload = document.getElementById('calcInputForm').addEventListener('mouseup', (event) => {
    if (event.target.type === 'button'){
        handleButton(event);
    }
});