let visor = document.getElementById('visor');

function digit(valor) {
    visor.value += valor;
}

function btnBack() {
    visor.value = visor.value.slice(0, -1);
}

function clean() {
    visor.value = ""
}

function separate() {
    let dadostela = visor.value;
    return dadostela.match(/\d+|\+|\-|\*|\//g);
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
    let valorfinalss = 0; /* Valor final da soma ou subtração */
    let operadores = ['+', '-', '*', '/'];
    let erro = false;


    if(operadores.includes(contacorreta[0])) { /* Começa com um operador? */
            erro = true;
            visor.value = 'Error in calculation';
        } else if(operadores.includes(contacorreta[contacorreta.length - 1])) { /* Termina com um operador? */
            erro = true;
            visor.value = 'Error in calculation';
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
