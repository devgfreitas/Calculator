let visor = document.getElementById('visor');

function btnNumber(valor) {
    visor.value += valor;
}

function btnBack() {
    visor.value = visor.value.slice(0, -1);
}

function btnOperator(op) {
    visor.value += op;
}

function percent() {
    let porcentagem = visor.value;
    porcentagem = porcentagem.slice(0, 10000000);
    try {
        porcentagem = porcentagem / 100;
        visor.value = porcentagem; 
    } catch {
        visor.value = "Conta já cadastrada";
    }
    
}

function clean() {
    visor.value = ""
}

function result() {
    try {
        let resultado = eval(visor.value);
        visor.value = resultado;
    } catch {
        visor.value = "Error in calculation";
    }
    
}
