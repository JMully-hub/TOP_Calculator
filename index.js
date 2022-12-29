function operate(){
    let a = parseFloat(calcMemory.mem1);
    let b = parseFloat(calcMemory.mem2);
    let operator = calcMemory.operator;
    let result;

    switch (operator){
        case '+': 
            result = (a + b).toFixed(0);
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

    clearMemory();
    calcDisplay.innerText = result
    calcMemory.mem1 = result;

};



function handleButton(event){

    if (event.target.value === 'Clear'){
        clearDisplay();
        clearMemory();
        return;
    }

    
    if (['+','-','*','/', '='].includes(event.target.value)){

        if (event.target.value === '=' && calcMemory.mem1 && calcMemory.mem2){
            operate();
            return;
        }
       
        if (!calcMemory.mem1){
            calcMemory.mem1 = calcDisplay.innerText;
            clearDisplay()
        }else if (calcMemory.mem1 && !calcMemory.mem2){
            calcMemory.mem2 = calcDisplay.innerText;
            clearDisplay();
        }

        if (calcMemory.mem1 && calcMemory.mem2){
            operate();
        }
        
        if (event.target.value !== '='){
            calcMemory.operator = event.target.value;
        }

        
    }else{ // numbers
        if (calcMemory.mem1 && calcDisplay.innerText !== ''){
            calcDisplay.innerText = '';
        }
        calcDisplay.innerText += event.target.value;
    }
}



function clearMemory(){
    Object.keys(calcMemory).forEach((i) => calcMemory[i] = null);
}


function clearDisplay(){
    calcDisplay.innerText = '';
}


// init
const calcMemory = {mem1:null, mem2:null, operator:null};
const calcDisplay = document.getElementById('calculation');
window.onload = document.getElementById('calcInputForm').addEventListener('mouseup', (event) => {
    if (event.target.type === 'button'){
        handleButton(event);
    }
});
