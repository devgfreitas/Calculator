let visor = document.getElementById('visor');

function digit(valor) {
    visor.value += valor;
};

function btnBack() {
    visor.value = visor.value.slice(0, -1);
};

function clean() {
    visor.value = ""
};

document.addEventListener('keydown', function(event) {
    if(event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' || event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/' || event.key == '%' || event.key == '.' ) {
        digit(event.key);
    } else if(event.key == 'Backspace') {
        btnBack();
    } else if (event.key == 'Enter') {
        console.log("ta indo");
        resolution();
    }
})

function separate() {
    let dadostela = visor.value;
    return dadostela.match(/\d+(?:[.,]\d+)?|\+|\-|\*|\/|\%/g);

}

function correctAccount() {
    let contaseparada = separate();
    let contacorreta = [];
    for(let i = 0; i < contaseparada.length; i++) {
        if(!isNaN(contaseparada[i])) {
            contacorreta.push(Number(contaseparada[i]));
        } else {
            contacorreta.push(contaseparada[i]);
        }
    }
    return contacorreta;
}

function resolution() {
    let contacorreta = correctAccount();
    let valorfinalmd = 0; /* Valor final da multiplicação ou divisão */
    let valorfinalp = 0; /* Valor final da porcentagem */
    let valorfinalss = 0; /* Valor final da soma ou subtração */
    let operadores = ['+', '-', '*', '/', '%'];
    let erro = false;


    if(operadores.includes(contacorreta[0])) { /* Começa com um operador? */
            erro = true;
            visor.value = 'Error in calculation';
        } else if(operadores.includes(contacorreta[contacorreta.length - 1])) { /* Termina com um operador? */
            if(contacorreta[contacorreta.length - 1] == '%') {

            } else {
                erro = true;
                visor.value = 'Error in calculation';
            }
            
    } else if(contacorreta == null || contacorreta.length == 0) {
            erro = true;
            visor.value = 'Error in calculation';
            contacorreta = [];
    }

    /* Análise de duplo operadores */
    for(let indice = 0; indice < contacorreta.length; indice++) {
        if(operadores.includes(contacorreta[indice]) && operadores.includes(contacorreta[indice + 1])) { /* Possui dois operadores seguidos? */
            erro = true;
            visor.value = 'Error in calculation';
            break; 
        }
        if(contacorreta[indice] == null || contacorreta[indice] == undefined) { /* Possui valor inválido? */
            erro = true;
            visor.value = 'Error in calculation';
            break;
        }
    }

    if(erro == false) {
        /* Multiplicação e Divisão */
        for(let i = 0; i < contacorreta.length; i++) { 
            if(contacorreta[i] == '*' || contacorreta[i] == '/') {
                if(contacorreta[i] == '*') {
                    valorfinalmd = contacorreta[i - 1] * contacorreta[i + 1];
                    contacorreta.splice(i - 1, 3, valorfinalmd);
                    i--;
                } else {
                    valorfinalmd = contacorreta[i - 1] / contacorreta[i + 1];
                    contacorreta.splice(i - 1, 3, valorfinalmd);
                    i--;
                }
            }
        }

        /* Porcentagem */
        for(let posicao = 0; posicao < contacorreta.length; posicao++) {
            if(contacorreta[posicao] == '%') {
                if(posicao >= 3) {
                    valorfinalp = contacorreta[posicao - 3] * contacorreta[posicao - 1] / 100;
                    contacorreta.splice(posicao - 1, 2, valorfinalp);
                    posicao--;
                } else {
                    valorfinalp = contacorreta[posicao - 1] / 100;
                    contacorreta.splice(posicao - 1, 2, valorfinalp);
                    posicao--;
                }
            }
        }

        for(let i = 0; i < contacorreta.length; i++) {
            if(contacorreta[i] == '+') {
                valorfinalss = contacorreta[i - 1] + contacorreta[i + 1];
                contacorreta.splice(i - 1, 3, valorfinalss);
                i--;
            } else if(contacorreta[i] == '-') {
                valorfinalss = contacorreta[i - 1] - contacorreta[i + 1];
                contacorreta.splice(i - 1, 3, valorfinalss);
                i--;
            }
        }

        visor.value = contacorreta[0];  
    }
               
}
