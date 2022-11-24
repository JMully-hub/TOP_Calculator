function operate(a, operator, b){
    switch (operator){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
};

function recordButton(event){
    document.getElementById('calculation').innerText += event.target.value;
}


// init
window.onload = document.getElementById('calcInputForm').addEventListener('mouseup', (event) => {
    recordButton(event);
});