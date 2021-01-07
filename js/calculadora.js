let numero;
let historico = "";
let expressaoLadoA;
let expressaoLadoB;
let operador = [];
let resultado = 0;
let operacaoComZero = false;
let operadores = ['+', '-', '×', '÷'];


/***
 * Converte o valor numérico digitado em uma String para a concatená-lo.
 * Após concatenar, converte essa String para Number novamente e guarda o valor
 * É permitido no máximo 10 caracteres na tela da calculadora
 * @param novoNumero {number} Novo valor numérico a ser concatenado
 */
function concatenarNumero(novoNumero)
{
    if(String(getNumero()).length >= 10){
        return;
    }

    if(getNumero() === undefined || getNumero() === 0) {
        setNumero(Number(novoNumero));
    }
    else {
        setNumero(Number(String(getNumero()).concat(String(novoNumero))));
    }
}

/***
 * Define o valor do número que será usado em um dos lados da expressão
 * @param valor {number} Valor numérico que será usado em um dos lados da expressão
 */
function setNumero(valor){
   numero = valor;
}

/***
 * Retorna o valor numérico digitado pelo usuário e que está sendo usado em um dos lados da expressão
 * @returns {number} Retorna o valor numérico que atualmente está sendo usado em um dos lados da expressão
 */
function getNumero() {
    return numero;
}

/***
 * Lado esquerdo da operação
 * @returns {number} Retorna o valor numérico da expressão do lado esquerdo da operação
 */
function getExpressaoLadoA(){
    return Number(expressaoLadoA);
}

/***
 * Define o valor numérico do lado esquerdo da expressão
 * @param param {number} Valor numérico do lado esquerdo da expressão
 */
function setExpressaoLadoA(param) {
    expressaoLadoA = param;
}

/***
 * Define o valor numérico do lado direito da expressão
 * @param param {number} Valor numérico do lado direito da expressão
 */
function setExpressaoLadoB(param) {
    expressaoLadoB = param;
}

/***
 * Retorna o valor numérico do lado direito da expressão
 * @returns {number} Retorna o valor numérico do lado direito da expressão
 */
function getExpressaoLadoB(){
    return Number(expressaoLadoB);
}

/***
 * Histórico de operações
 * @returns {string} Retorna o histórico das operações
 */
function getHistorico() {
    return historico;
}

/***
 * Define o histórico de operações
 * @param novoHistorico {string, null} Valor que será armazenado, null para zerar o histórico.
 * @param concatenar {boolean} true (ou vazio) para concatenar o novo histórico ao histórico anterior, false para sobrescrever o histórico
 */
function setHistorico(novoHistorico, concatenar = true)
{
    if(novoHistorico === null){
        historico = '';
        return;
    }
    concatenar === true ? historico += novoHistorico : historico = novoHistorico;
}

function atualizarOperadorVisor() {
    setHistorico(getHistorico().slice(0, getHistorico().length - 2 ), false);
    setHistorico(getHistorico() + getOperador() + " ", false);
}

/***
 * Atualiza o histórico de operações
 */
function atualizarHistorico(param = null)
{
    //O número deve obrigatoriamente existir
    if(getNumero() === undefined){
        setNumero(0);
    }

    //Verifica se o último caractere é um número. Se for um número, coloque depois dele um operador
    if(!operadores.includes(getHistorico().slice(-2).trim()) && getHistorico().length > 1){
        console.log(operadores, getHistorico().slice(-2).trim());
        setHistorico(` ${getOperador()}`);
    }

    //Verifica se o usuário mudou o operador. Se sim, atualize esse operador no histórico
    if(getNumero() !== Number(document.getElementsByClassName('calculadora-visor-texto')[0].innerHTML) ){ console.log('caso1')
        atualizarOperadorVisor();
    }
    else if ( getNumero() === 0 && Number(document.getElementsByClassName('calculadora-visor-texto')[0].innerHTML) === 0)
    {console.log('caso3')
        if(getHistorico() == ""){
            setHistorico(String(getNumero()) + " " + getOperador() + " ", false);
        }
        else if(operacaoComZero){ console.log('caso3-1')
            atualizarOperadorVisor();
        }
        else{console.log('caso3-2')
            setHistorico(getNumero() + " " + getOperador() + " ");
            atualizarOperadorVisor();
            operacaoComZero = true;
        }
    }
    else if(param === 'semsinal'){
        setHistorico(getNumero() + " ");
    }
    else{console.log('caso5')
        setHistorico(getNumero() + " " + getOperador() + " ");
        operacaoComZero = false;
    }

    document.getElementsByClassName('calculadora-visor-historico')[0].innerHTML = getHistorico();
}

function limparHistorico() {
    setHistorico(null);
    document.getElementsByClassName('calculadora-visor-historico')[0].innerHTML = getHistorico();
}

/***
 * Define qual operador está sendo usado
 * @param {string} novoOperador Operador que será usado na resolução da operação
 */
function setOperador(novoOperador)
{
    if(operador.length >= 2){
        operador.shift();
        operador.push(novoOperador);
    }
    else{
        operador.push(novoOperador);
    }
}

/***
 * Retorna qual operador está sendo usado na operação atual
 * @returns {string} Retorna o operador usado na operação atual
 */
function getOperador(index = null)
{
    if(index !== null && index < 2) {
        return operador[index];
    }
    else if(operador.length === 0){
        console.log('Não existem operadores ativos')
        return undefined;
    }
    else if(operador.length === 1){
        return operador[0];
    }
    else {
            return operador[operador.length - 1]
    }
}

/***
 * Verifica qual o tipo de operador será utilizado na operaçãon(+, -, * ou /)
 * @param {string} param String usada para encontrar o operador
 */
function verificarOperador(param)
{
    if(param.slice(0, 8) === 'operacao'){
        setOperador(param.charAt(8));
    }
}

function setTexto(param) {
    document.getElementsByClassName('calculadora-visor-texto')[0].innerHTML = String(param);
}

function atualizarVisor(param = null)
{
    if(getNumero() === undefined) {
        setNumero(Number(document.getElementsByClassName('calculadora-visor-texto')[0]));
        return;
    }

    setTexto('');
    param === null ? setTexto(getNumero()) : setTexto(param);
}

function zerarNumero() {
    setNumero(0);
    atualizarVisor();
}

function resetarCalculadora(){
    setNumero(0);
    setExpressaoLadoA(undefined);
    setExpressaoLadoB(undefined);
    setOperador('');
    limparHistorico();
    atualizarVisor();
}

/***
 * Apaga o último dígito
 * Valores negativos entre -1 e -9 são substituídos por 0, para evitar que o JS retorne NaN
 */
function backspace()
{
    if(getNumero() == 0)
        return;

    if(getNumero() < 0 && getNumero() > (-9))
        setNumero(0);

    setNumero(Number(String(getNumero()).slice(0, -1)));
    atualizarVisor();
}

/***
 * Inverte o sinal
 */
 function inverterSinal(){
    setNumero(getNumero() * (-1));
    atualizarVisor();
}

/***
 * Verifica se todos os parâmetros estão ok para que a operação seja feita
 */
 function prepararOperacao()
{

    if(isNaN(getExpressaoLadoA())) {
        setExpressaoLadoA(getNumero());
        setNumero(0);
        return false;
    }
    else if(isNaN(getExpressaoLadoB())){
        setExpressaoLadoB(getNumero());
        return true;
    }
    else{
        return false;
    }
}

/***
 * Realiza a operação entre a Expressão A e Exressão B
 * @param paramA {Number} Valor de um lado A da expressão
 * @param paramB {Number} Valor do lado B da Expressão
 * @returns {*} Resultado da expressão, ou undefined se os parâmetros forem passados incorretamente
 */
function realizarOperacao()
{
    //alert(`realop: ${getExpressaoLadoA()} ${getOperador()} ${getExpressaoLadoB()}`)
     if(!isNaN(getExpressaoLadoA()) && !isNaN(getExpressaoLadoB()))
    {
        switch (getOperador(0))
        {
            case '+': return getExpressaoLadoA() + getExpressaoLadoB(); break;

            case '-': return getExpressaoLadoA() - getExpressaoLadoB(); break;

            case '/': return getExpressaoLadoA() / getExpressaoLadoB(); break;

            case '×': return getExpressaoLadoA() * getExpressaoLadoB(); break;
        }
    }
    else
    {
        console.log('Erro: os dois lados da expressão precisam estar definidos', '\n', 'Função: realizarOperacao()');
        return undefined;
    }
}

function posOperacao(resultadoOperacao)
{
    if(resultadoOperacao == null){
        console.log('Alerta: parâmetro não pode ser vazio, operação cancelada', '\n', 'Função: posOperacao');
        return false;
    }

    setExpressaoLadoA(resultadoOperacao);
    setExpressaoLadoB(undefined);
    setNumero(0);
    atualizarVisor(resultadoOperacao);
    return true;
}

/***
 * Verifica qual a função passada pela calculadora
 * @param param {String} Função passada pela calculadora
 */
function verificarFuncao(param)
{
    switch (param.slice(7))
    {
        case 'ce':  zerarNumero(); break;

        case 'c': resetarCalculadora(); break;

        case 'backspace' : backspace(); break;

        case 'inverte_sinal' : inverterSinal(); break;

        case 'resultado' :
            atualizarHistorico('semsinal');
            if(prepararOperacao()){
                posOperacao(realizarOperacao());
                setExpressaoLadoB(undefined);
            }
            break;
    }
}

function definirTarefa(param)
{
    if(param.slice(0, 8) === 'operacao')
    {
        verificarOperador(param);
        atualizarHistorico();

        if(prepararOperacao()){
            posOperacao(realizarOperacao());
            setExpressaoLadoB(undefined);
        }
    }

    if(param.slice(0, 6) === 'funcao'){
        verificarFuncao(param);
    }
}

function calculadora(param)
{
    switch (typeof param)
    {
        case ("string"):
        {
            definirTarefa(param);
            break;
        }
        case("number"):
        {
            concatenarNumero(param);
            atualizarVisor();
            break;
        }
    }
}

