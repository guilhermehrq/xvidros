var tables, dropDown, qntdProgrammers, tipoSistema, priceHour, checkboxSeconds;

function exceptions() {
    tables = document.getElementById('colunas').value;
    dropDown = document.getElementById('language').value;
    // qntdProgrammers = parseInt(document.getElementById('programmers').value);
    qntdProgrammers = 1;
    tipoSistema = document.getElementById('types').value;
    priceHour = document.getElementById('priceHour').value;
    // checkboxSeconds = document.getElementById('seconds').checked;
    checkboxSeconds = true;

    if (dropDown && qntdProgrammers && tipoSistema && priceHour) {
        calc();
        inserirValores();
        


    } else {
        alert('Algo não foi preenchido, revise suas entradas')
    }  
}

function calc() {
    var geral = 0;
    vetQntd = [];
    arrayResultadoPesos = [];
    const FA = 1.35;
    FPb = 0, Step3 = 0;
    meses = 0;
    var entrada, saida, consulta, vInterface, arquivo;

    var languages = [
        {lang: 'Java', loc: 20},
        {lang: 'COBOL', loc: 100},
        {lang: 'VB', loc: 20},
        {lang: 'Pascal', loc: 90},
        {lang: 'C++', loc: 30},
        {lang: 'Gerador de Codigo', loc: 15}
    ];
    var tiposDeSistema = [
        {type: 'Sistema Web', Kloc: 3300},
        {type: 'Comércio Eletronico', Kloc: 3600},
        {type: 'Sistema Comercial', Kloc: 2500}
    ];
    filterLang = languages.filter(item => {
        return item.lang === dropDown
    });

    filterTipoSistema = tiposDeSistema.filter(item => {
        return item.type === tipoSistema
    });
    console.log('SISTEMA', filterTipoSistema)
    tables = tables.split(' ');

    for (i = 0; i < tables.length; i++) {
        geral += parseInt(tables[i])
    }
    //Entrada
    var coluna = calculaColunas(4, 5, 15, 16, tables);
    entrada = calculaLinhas(0, 1, 2, 2, 3, coluna);
    vetQntd.push(entrada);

    //Saida
    tables.push(geral);
    coluna = calculaColunas(5, 6, 19, 20, tables);
    saida = calculaLinhas(0, 1, 2, 3, 4, coluna);
    vetQntd.push(saida);

    //Consulta
    coluna = calculaColunas(4, 5, 15, 16, tables);
    consulta = calculaLinhas(0, 1, 2, 2, 3, coluna);
    vetQntd.push(consulta);

    //Arquivo
    tables.pop();
    coluna = calculaColunas(19, 20, 50, 51, tables);
    arquivo = calculaLinhas(1, 1, 2, 5, 6, coluna);
    vetQntd.push(arquivo);

    //Interface
    tables.push(geral);
    coluna = calculaColunas(19, 20, 50, 51, tables);
    vInterface = calculaLinhas(1, 1, 2, 5, 6, coluna);
    vetQntd.push(vInterface);
    console.log(vetQntd);

    //Entrada
    arrayResultadoPesos.push(vetQntd[0].simples * 3);
    arrayResultadoPesos.push(vetQntd[0].medio * 4);
    arrayResultadoPesos.push(vetQntd[0].complexo * 6);

    //Saida
    arrayResultadoPesos.push(vetQntd[1].simples * 4);
    arrayResultadoPesos.push(vetQntd[1].medio * 5);
    arrayResultadoPesos.push(vetQntd[1].complexo * 7);

    //Consulta
    arrayResultadoPesos.push(vetQntd[2].simples * 3);
    arrayResultadoPesos.push(vetQntd[2].medio * 4);
    arrayResultadoPesos.push(vetQntd[2].complexo * 6);

    //Arquivos
    arrayResultadoPesos.push(vetQntd[3].simples * 7);
    arrayResultadoPesos.push(vetQntd[3].medio * 10);
    arrayResultadoPesos.push(vetQntd[3].complexo * 15);

    //Interface
    arrayResultadoPesos.push(vetQntd[4].simples * 5);
    arrayResultadoPesos.push(vetQntd[4].medio * 7);
    arrayResultadoPesos.push(vetQntd[4].complexo * 10);
    console.log(arrayResultadoPesos);

    //Calculo do FP bruto
    for (i = 0; i < arrayResultadoPesos.length; i++) {
        FPb += arrayResultadoPesos[i]
    }
    console.log('FPb: ' + FPb);
    arrayCasaDecimal = [];
    Step3 = FPb * FA;

    console.log('FPr: ' + FPb + '*' + FA);
    resultFPr = Step3.toString().split('.');
    console.log('Result', resultFPr)
    //Tirando a virgula da multiplicação acima
    arrayCasaDecimal = Step3.toString().split('.');

    // Tava dando erro pois nem sempre da um número com virgula
    if(arrayCasaDecimal.length > 1) {
        arrayCasaDecimal.pop();    
    }

    console.log('FPr: ' + arrayCasaDecimal[0]);
    console.log('Tipo de sistema escolhido: ' + filterLang[0].lang + ': ' + filterLang[0].loc);

    Step3 = parseInt(arrayCasaDecimal[0]) * filterLang[0].loc;
    klocSitema = Step3;
    console.log('Kloc: ' + arrayCasaDecimal[0] + '*' + filterLang[0].loc + '=' + Step3);

    meses = Step3 / filterTipoSistema[0].Kloc;

    //Pegando somente duas casas depois da virgula para fazer os calculos de prazo
    arrayCasaDecimal = meses.toString().split('.');

    if (arrayCasaDecimal[1] && arrayCasaDecimal[1].length > 2)
        arrayCasaDecimal[1] = arrayCasaDecimal[1].substring(0, 2);

    meses = parseFloat(arrayCasaDecimal[0] + "." + arrayCasaDecimal[1]);

    //Calculo do preço
    preco = meses * 132 * priceHour;
    console.log('Preço: ' + meses + '*' + 132 + '*' + priceHour);

    //Calculo do prazo
    arrayCasaDecimal = preco.toString().split('.');

    if (arrayCasaDecimal[1] && arrayCasaDecimal[1].length > 2)
        arrayCasaDecimal[1] = arrayCasaDecimal[1].substring(0, 2);

    preco = parseFloat(arrayCasaDecimal[0] + "." + arrayCasaDecimal[1]);

    console.log('Total: R$ ' + preco);
    console.log('Prazo');
    console.log('Meses: ' + (meses/qntdProgrammers));


    arrayCasaDecimal = meses.toString().split('.');
    dias = parseFloat('0.' + arrayCasaDecimal[1]) * 22;
    console.log('Dias: ' + (dias/qntdProgrammers));

    arrayCasaDecimal = dias.toString().split('.');
    horas = parseFloat('0.' + arrayCasaDecimal[1]) * 6;
    console.log('Horas: ' + (horas/qntdProgrammers));

    arrayCasaDecimal = horas.toString().split('.');
    minutos = parseFloat('0.' + arrayCasaDecimal[1]) * 60;
    console.log('Minutos: ' + (minutos/qntdProgrammers));

    if (checkboxSeconds) {
        arrayCasaDecimal = minutos.toString().split('.');
        segundos = parseFloat('0.' + arrayCasaDecimal[1]) * 60;
        console.log('Segundos: ' + (segundos/qntdProgrammers))
    }

}

function calculaColunas(a, b, c, d, tables) {
    var coluna = {um: 0, dois: 0, tres: 0};

    for (var i = 0; i < tables.length; i++) {
        if (1 <= parseInt(tables[i]) && parseInt(tables[i]) <= a) {
            coluna.um++
        }
        else if (b <= parseInt(tables[i]) && parseInt(tables[i]) <= c) {
            coluna.dois++
        }
        else if (d <= parseInt(tables[i])) {
            coluna.tres++
        }
    }

    return coluna
}

function calculaLinhas(a, b, c, d, e, coluna) {
    var linha = {simples: 0, medio: 0, complexo: 0};

    //Linha 1
    if (coluna.um === a || coluna.um === b) {
        linha.simples += coluna.um;
    }
    else if (coluna.um >= c && coluna.um <= d) {
        linha.simples += coluna.um;
    }
    else if (coluna.um >= e) {
        linha.medio += coluna.um;
    }

    //Linha2
    if (coluna.dois === a || coluna.dois === b) {
        linha.simples += coluna.dois;
    }
    else if (coluna.dois >= c && coluna.dois <= d) {
        linha.medio += coluna.dois;
    }
    else if (coluna.dois >= e) {
        linha.complexo += coluna.dois;
    }

    //Linha 3
    if (coluna.tres === a || coluna.tres === b) {
        linha.medio += coluna.tres;
    }
    else if (coluna.tres >= c && coluna.tres <= d) {
        linha.complexo += coluna.tres;
    }
    else if (coluna.tres >= e) {
        linha.complexo += coluna.tres;
    }
    return linha;
}

function verificarInputs(){

    if(document.getElementById('priceHour').value != ''){
        document.querySelector('[for="priceHour"]').classList.add('label-input-active');

    }else {
        document.querySelector('[for="priceHour"]').classList.remove('label-input-active')
    }


    if(document.getElementById('types').value != "null"){
        document.querySelector('[for="types"]').classList.add('label-input-active');

    }else {
        document.querySelector('[for="types"]').classList.remove('label-input-active')
    }


    if(document.getElementById('language').value != "null"){
        document.querySelector('[for="language"]').classList.add('label-input-active');

    }else {
        document.querySelector('[for="language"]').classList.remove('label-input-active')
    }
}

function inserirValores() {
   var tdOcorrencias = document.querySelectorAll('[name="nroOcorrencias"]');
   console.log(document.querySelectorAll('[name="nroOcorrencias"]'))

   
   // Entrada
   tdOcorrencias[0].innerText = vetQntd[0].simples;
   tdOcorrencias[1].innerText = vetQntd[0].medio;
   tdOcorrencias[2].innerText = vetQntd[0].complexo;

   // Saida
   tdOcorrencias[3].innerText = vetQntd[1].simples;
   tdOcorrencias[4].innerText = vetQntd[1].medio;
   tdOcorrencias[5].innerText = vetQntd[1].complexo;

   // Consulta
   tdOcorrencias[6].innerText = vetQntd[2].simples;
   tdOcorrencias[7].innerText = vetQntd[2].medio;
   tdOcorrencias[8].innerText = vetQntd[2].complexo;

   // Arquivos
   tdOcorrencias[9].innerText = vetQntd[3].simples;
   tdOcorrencias[10].innerText = vetQntd[3].medio;
   tdOcorrencias[11].innerText = vetQntd[3].complexo;

   // interface
   tdOcorrencias[12].innerText = vetQntd[4].simples;
   tdOcorrencias[13].innerText = vetQntd[4].medio;
   tdOcorrencias[14].innerText = vetQntd[4].complexo;


   var tdResult = document.querySelectorAll('[name="tabela-resultado"]');

   for(var i = 0; i < arrayResultadoPesos.length; i++){
        tdResult[i].innerText = arrayResultadoPesos[i];
   }

   var rfpb = document.querySelectorAll('[name="fpb"]');

   for(var i = 0; i < rfpb.length; i++) {
        rfpb[i].innerText = FPb;
   }

   console.log(resultFPr);
   if(resultFPr[1]) {
    document.getElementById('fpr').innerText = resultFPr[0] + ',' + resultFPr[1].substring(0, 2); 
   }else {
    document.getElementById('fpr').innerText = resultFPr[0];
   }
   

   document.querySelectorAll('[name="fprTotal"]')[0].innerText = resultFPr[0];
   document.querySelectorAll('[name="fprTotal"]')[1].innerText = resultFPr[0];

   document.querySelectorAll('[name="precoHora"]')[0].innerText = document.getElementById('priceHour').value;
   document.querySelectorAll('[name="precoHora"]')[1].innerText = document.getElementById('priceHour').value;

   document.querySelectorAll('[name="porcMes"]')[0].innerText = meses;
   document.querySelectorAll('[name="porcMes"]')[1].innerText = meses;
   var totalMes = meses.toString().split('.');
   document.querySelectorAll('[name="porcMes"]')[2].innerText = totalMes[0];
   document.querySelectorAll('[name="porcMes"]')[3].innerText = meses;
   document.querySelectorAll('[name="porcMes"]')[4].innerText = '0.' + totalMes[1];

   document.querySelectorAll('[name="preco"]')[0].innerText = preco;
   document.querySelectorAll('[name="preco"]')[1].innerText = 'R$ ' + preco;

   document.querySelectorAll('[name="lang"]')[0].innerText = filterLang[0].lang;

   document.querySelectorAll('[name="loc"]')[0].innerText = filterLang[0].loc;
   document.querySelectorAll('[name="loc"]')[1].innerText = filterLang[0].loc;

   document.querySelectorAll('[name="kloc"]')[0].innerText = klocSitema;
   document.querySelectorAll('[name="kloc"]')[1].innerText = klocSitema;
   document.querySelectorAll('[name="kloc"]')[2].innerText = klocSitema;

   document.querySelectorAll('[name="sistema"]')[0].innerText = tipoSistema;

   document.querySelectorAll('[name="kloc-tipo-sistema"]')[0].innerText = filterTipoSistema[0].Kloc;
   document.querySelectorAll('[name="kloc-tipo-sistema"]')[1].innerText = filterTipoSistema[0].Kloc;
   document.querySelectorAll('[name="kloc-tipo-sistema"]')[2].innerText = filterTipoSistema[0].Kloc;

   var totalDias = dias.toString().split('.');
   document.querySelectorAll('[name="porcDias"]')[0].innerText = totalDias[0];
   document.querySelectorAll('[name="porcDias"]')[1].innerText = dias;
   document.querySelectorAll('[name="porcDias"]')[2].innerText = '0.' + totalDias[1];

   var totalHoras = horas.toString().split('.');
   document.querySelectorAll('[name="porcHoras"]')[0].innerText = totalHoras[0];
   document.querySelectorAll('[name="porcHoras"]')[1].innerText = horas;
   document.querySelectorAll('[name="porcHoras"]')[2].innerText = '0.' + totalHoras[1];

   var totalMin = minutos.toString().split('.');
   document.querySelectorAll('[name="porcMin"]')[0].innerText = totalMin[0];
   document.querySelectorAll('[name="porcMin"]')[1].innerText = minutos;
   document.querySelectorAll('[name="porcMin"]')[2].innerText = '0.' + totalMin[1];

   var totalSeg = segundos.toString().split('.');
   document.querySelectorAll('[name="porcSeg"]')[0].innerText = totalSeg[0];
   document.querySelectorAll('[name="porcSeg"]')[1].innerText = segundos;

   document.querySelectorAll('[name="prazoTotal"]')[0].innerText = totalMes[0] + ' Meses ' + totalDias[0] + ' dias ' + totalHoras[0] + ' horas ' + totalMin[0] + ' minutos e ' + totalSeg[0] + ' segundos' 



}
var btnMostra = false;
function mostrarMais() {
    btnMostra = !btnMostra;
    if(btnMostra) {
        document.querySelectorAll('.float-mini')[0].style.bottom = '125px';
        document.querySelectorAll('.float-mini')[1].style.bottom = '75px';
        document.querySelectorAll('.material-icons')[10].innerText = 'close';
        document.querySelectorAll('.material-icons')[10].style.transform = 'rotate(180deg)';

    }else {
        clearTimeout(a);
        document.querySelectorAll('.material-icons')[10].style.transform = 'rotate(0deg)';
        document.querySelectorAll('.float-mini')[0].style.bottom = '10px';
        document.querySelectorAll('.float-mini')[1].style.bottom = '10px';
        var a = setTimeout(function(){
            document.querySelectorAll('.material-icons')[10].innerText = 'more_vert';
        }, 50)
        

    }
}

function goBack(tela) {
    if(tela == 1) {
        document.getElementById('entrada-valores').style.display = 'block';
        document.getElementById('tabelas-saida').style.display = 'none';
        for(var i = 0; i < document.querySelectorAll('.float').length; i++){
            document.querySelectorAll('.float')[i].style.display = 'none'
        }
    }
    if(tela == 2) {
        document.getElementById('custos').style.display = 'none';
        document.getElementById('tabelas-saida').style.display = 'block';
    }
    if(tela == 3) {
        document.getElementById('prazos').style.display = 'none';
        document.getElementById('tabelas-saida').style.display = 'block';
    }
    
}

function chamarTela(tela) {
    if(tela == 1) {
        document.getElementById('entrada-valores').style.display = 'none';
        document.getElementById('tabelas-saida').style.display = 'block';
        for(var i = 0; i < document.querySelectorAll('.float').length; i++){
            document.querySelectorAll('.float')[i].style.display = 'block'
        }
    }
    if(tela == 2) {
        document.getElementById('tabelas-saida').style.display = 'none';
        document.getElementById('prazos').style.display = 'none';
        document.getElementById('custos').style.display = 'block';
    }
    if(tela == 3) {
        document.getElementById('tabelas-saida').style.display = 'none';
        document.getElementById('custos').style.display = 'none';
        document.getElementById('prazos').style.display = 'block';

    }
}