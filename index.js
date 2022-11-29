function operate(aStr, operator, bStr){
    let a = parseFloat(aStr);
    let b = parseFloat(bStr);
    switch (operator){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
};

function recordButton(event){

    if (event.target.value === 'Clear'){
        document.getElementById('calculation').innerText = '';
        runningCalculation.a = null;
        runningCalculation.b = null;
        runningCalculation.operator = null;
        runningCalculation.memory = '';
        return;
    }


    if (['+','-','*','/','='].includes(event.target.value)){
        

        if (!runningCalculation.a ){
            runningCalculation.a = runningCalculation.memory;
            document.getElementById('calculation').innerText = '';
        }else{
            runningCalculation.b = runningCalculation.memory;
            document.getElementById('calculation').innerText = '';
        }  

        if (runningCalculation.a && runningCalculation.b && runningCalculation.operator){
            runningCalculation.a = operate(runningCalculation.a, runningCalculation.operator, runningCalculation.b)
            runningCalculation.operator = event.target.value;
            runningCalculation.b = null;
            runningCalculation.memory = '';
            //document.getElementById('calculation').innerText = runningCalculation.a ;
           
        }
        if (event.target.value !== '=') {
            runningCalculation.operator = event.target.value;
        }
        runningCalculation.memory = '';
    }else{
        runningCalculation.memory += event.target.value;
        document.getElementById('calculation').innerText += event.target.value;
        }
    
  
   
}


// init
const runningCalculation = {a:null, b:null, operator:null, memory:''};
window.onload = document.getElementById('calcInputForm').addEventListener('mouseup', (event) => {
    if (event.target.type === 'button'){
        recordButton(event);
        console.log(runningCalculation);
    }
});