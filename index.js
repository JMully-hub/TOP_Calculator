function handleInput(buttonPress){

    // reset and clear display
    if (buttonPress === 'Clear'){
        calcDisplay.innerText = '';
        clearMemory();
        return;
    }

    // del button, only if input in memory otherwise nothing to delete
    else if (buttonPress === 'Del'){
        if (calcMemory.userInput){
            newStr = calcMemory.userInput.substring(0,calcMemory.userInput.length-1);
            calcMemory.userInput = newStr;
            updateDisplay(calcMemory.userInput);
            }
        return;
    }

    
    // if an operater is pressed, treat like '=' sign if certain conditions are met
    // To behave more like a calc that are in use, rather than pressing '=' each time.
    else if (['+','-','*','/', '='].includes(buttonPress)){


        // clear the decimal memory so new input can have decimal, after each operator press
        calcMemory.decimal = '';

        
        if(calcMemory.mem1 && calcMemory.userInput && !calcMemory.operator ){
            // Only occurs once "=" is pressed, then user enters a number 
            // (not continuing the calculation by using the displayed number followed by an operator).
            // Expects a fresh calculation to take place
            calcMemory.mem1 = calcMemory.userInput
            calcMemory.userInput = '';
            calcMemory.operator = buttonPress;
            return
        }

        if (buttonPress === '=' && calcMemory.mem1 && calcMemory.mem2){25
            operate();
            return;
        // simple '=' operation
        }
       
        if (!calcMemory.mem1){calcMemory.mem1 = calcMemory.userInput;
            clearDisplayMemory();
            // mem1 not set then store numbers input up to this point and 
            // then clear displayMemory for re-use, keep the input numbers
            // on the display
            
        }else if (calcMemory.mem1 && !calcMemory.mem2){
            calcMemory.mem2 = calcMemory.userInput;
            clearDisplayMemory();}
        // mem2 not set then store numbers input up to this point and 
        // then clear displayMemory for re-use, keep the input numbers
        // on the display

        
        if (calcMemory.mem1 && calcMemory.mem2){operate()}
        // all conditions met to be able to perform a calculation
            
        
        if (buttonPress!== '='){calcMemory.operator = buttonPress}
        // save the operator to be calculated on next operator or '=' press
        // overwrites previous operator, i.e. if user changes mind on which
        // operator they wished to use for calculation
        

    }else{ 
        // numbers input, keep logging until operator pressed

        if (buttonPress=== '.'){if (calcMemory.decimal){return}
            else{calcMemory.decimal = true}}
            // only log one decimal

        calcMemory.userInput += buttonPress;
        updateDisplay(calcMemory.userInput);
        console.log(calcMemory);
    }
}


function operate(){
    // called once calcMemory obj has mem1, mem2 and an operator
    let a = parseFloat(calcMemory.mem1);
    let b = parseFloat(calcMemory.mem2);
    let operator = calcMemory.operator;
    let result;

    switch (operator)
    {case '+': result = (a + b).toString(); break;
    case '-': result =  a - b; break;
    case '*': result =  a * b; break;
    case '/': result =  a / b; break;
    case '=': result = a; break;
    case null: result = a; break}

    // clear the calcMemory obj, then store above result to mem1 
    // for future use, update the display with the result
    clearMemory();

    // divide by zero
    if (result === Infinity){
        updateDisplay('Stop Trying To Break My Stuff!');
        return;
    }
    calcMemory.mem1 = result;

    // No more than 9 decimal places for display but only if decimal
    // 10000.0000000067 will still expand the grid
    result = Math.round(result*10000000000)/10000000000;
    updateDisplay(result);
    console.log(calcMemory);
};


function clearMemory() {Object.keys(calcMemory).forEach((i) => calcMemory[i] = '')}

function clearDisplayMemory() {calcMemory.userInput = ''}

function updateDisplay(text) {calcDisplay.innerText = text}

// init
const calcMemory = {mem1:'', mem2:'', operator:'', userInput:'', decimal:''};
const calcDisplay = document.getElementById('calculation');
const inputButtons = document.getElementsByTagName("input");

window.onload = function(){
    document.getElementById('calcContainer').addEventListener('mouseup', (event) => {
        if (event.target.type === "button"){

            handleInput(event.target.value)}
        }),

    // keyboard support
    document.addEventListener('keyup', (event) => {
        if (keyPress = event.key, ['Backspace','Delete'].includes(event.key)) keyPress = 'Del'; 
        else if (["=","Enter"].includes(event.key)) keyPress = "=";

        //ignore any other input not in list
        else if (!['+','-','*','/','.','0','1','2','3','4','5','6','7','8','9'].includes(keyPress)) return;

        handleInput(keyPress)})
    };