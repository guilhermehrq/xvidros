//Inicia o jogo executando as funções principais

var casa;
var casas;
var jogador;
var tabuleiro = [];
var contador = 0;
var placarX = 0;
var placarO = 0;
var ganhou;

window.onload = function () {
    pegaId();
    jogador = "X";
    document.getElementById("mensagemJogador").innerHTML = "VEZ DO JOGADOR <strong>X</strong>";
    document.getElementById("jogadorX").classList.add("borderBottom");

    var conta = Math.floor((Math.random() * 2) +1)
    console.log(conta);
};




function pegaId(){ //PEGA O ID DA CASA QUANDO ELA SOFRE O EVENDO 'CLICK'
    casas = document.getElementById('casas'); //Pega o ID da ul
    casas.addEventListener('click',function (e) {
        casa = (e.target.id); //Pega o id da casa(li) 'clicada'
        if(casa != "casas") {
            contador += 1;
            marcar(); //seta a casa com o simbolo do jogador
            trocaMarcador(); //Faz a troca do marcador (x para o e o inverso)
            vezJogador();
            ganhador(); //Define as regras para que um jogador ganhe o jogo
        }else{
            // alert(batata);
        }
    });
}

function trocaMarcador() {
    if(jogador === "X"){
        jogador = "O";
    }else{
        jogador = "X";
    }
}
function marcar() {
    var marcar = document.getElementById(casa);
    marcar.innerText = jogador;
    marcar.classList.add("pointEvents"); //Define a casa como nao 'clicavel' depois de setado o jogador

    //Coloca o valor da casa em seu respectivo vetor [0..8]
    if(casa === "casa0"){
        tabuleiro[0] = jogador;
        console.log(tabuleiro[0]);
    }else if(casa === "casa1"){
        tabuleiro[1] = jogador;
        console.log(tabuleiro[1]);
    }else if(casa === "casa2"){
        tabuleiro[2] = jogador;
        console.log(tabuleiro[2]);
    }else if(casa === "casa3"){
        tabuleiro[3] = jogador;
        console.log(tabuleiro[3]);
    }else if(casa === "casa4"){
        tabuleiro[4] = jogador;
        console.log(tabuleiro[4]);
    }else if(casa === "casa5"){
        tabuleiro[5] = jogador;
        console.log(tabuleiro[5]);
    }else if(casa === "casa6"){
        tabuleiro[6] = jogador;
        console.log(tabuleiro[6]);
    }else if(casa === "casa7"){
        tabuleiro[7] = jogador;
        console.log(tabuleiro[7]);
    }else if(casa === "casa8"){
        tabuleiro[8] = jogador;
        console.log(tabuleiro[8]);
    }
}

function ganhador() {
    if((tabuleiro[0] === "X" && tabuleiro[1] === "X" && tabuleiro[2] === "X") ||
        (tabuleiro[3] === "X" && tabuleiro[4] === "X" && tabuleiro[5] === "X") ||
        (tabuleiro[6] === "X" && tabuleiro[7] === "X" && tabuleiro[8] === "X") ||
        (tabuleiro[0] === "X" && tabuleiro[3] === "X" && tabuleiro[6] === "X") ||
        (tabuleiro[1] === "X" && tabuleiro[4] === "X" && tabuleiro[7] === "X") ||
        (tabuleiro[2] === "X" && tabuleiro[5] === "X" && tabuleiro[8] === "X") ||
        (tabuleiro[0] === "X" && tabuleiro[4] === "X" && tabuleiro[8] === "X") ||
        (tabuleiro[2] === "X" && tabuleiro[4] === "X" && tabuleiro[6] === "X")){
        document.getElementById("mensagemJogador").innerHTML = "JOGADOR <strong>X</strong> GANHOU";
        casas.classList.add("pointEvents");
        placarX += 1;
        document.getElementsByClassName("jogadorX")[0].innerText = placarX;
        document.getElementById("jogadorO").classList.remove("borderBottom");
        document.getElementById("jogadorX").classList.add("borderBottom");
        pintarGanhador();//Passa uma linha indicando o ganhador
        ganhou = "X";
    }else if((tabuleiro[0] === "O" && tabuleiro[1] === "O" && tabuleiro[2] === "O") ||
             (tabuleiro[3] === "O" && tabuleiro[4] === "O" && tabuleiro[5] === "O") ||
             (tabuleiro[6] === "O" && tabuleiro[7] === "O" && tabuleiro[8] === "O") ||
             (tabuleiro[0] === "O" && tabuleiro[3] === "O" && tabuleiro[6] === "O") ||
             (tabuleiro[1] === "O" && tabuleiro[4] === "O" && tabuleiro[7] === "O") ||
             (tabuleiro[2] === "O" && tabuleiro[5] === "O" && tabuleiro[8] === "O") ||
             (tabuleiro[0] === "O" && tabuleiro[4] === "O" && tabuleiro[8] === "O") ||
             (tabuleiro[2] === "O" && tabuleiro[4] === "O" && tabuleiro[6] === "O")){
        document.getElementById("mensagemJogador").innerHTML = "JOGADOR <strong>O</strong> GANHOU";
        casas.classList.add("pointEvents");
        placarO += 1;
        document.getElementsByClassName("jogadorO")[0].innerText = placarO;
        document.getElementById("jogadorX").classList.remove("borderBottom");
        document.getElementById("jogadorO").classList.add("borderBottom");
        pintarGanhador();//Passa uma linha indicando o ganhador
        ganhou = "O";
    }else if(contador === 9){
        document.getElementById("mensagemJogador").innerHTML = "<strong>VELHA</strong>";
        document.getElementById("jogadorX").classList.remove("borderBottom");
        document.getElementById("jogadorO").classList.remove("borderBottom");
        casas.classList.add("pointEvents");
        ganhou = "V";
        document.getElementById('velha').style.display = "block";
        document.getElementsByTagName('img')[0].style.transform = "scale(1)";

    }
}

function vezJogador() {
    if(jogador === "X"){
        document.getElementById("mensagemJogador").innerHTML = "VEZ DO JOGADOR <strong>X</strong>";
        document.getElementById("jogadorO").classList.remove("borderBottom");
        document.getElementById("jogadorX").classList.add("borderBottom");
    }else if(jogador === "O"){
        document.getElementById("mensagemJogador").innerHTML = "VEZ DO JOGADOR <strong>O</strong>";
        document.getElementById("jogadorX").classList.remove("borderBottom");
        document.getElementById("jogadorO").classList.add("borderBottom");
    }
}

function reiniciar() {
        resetarTabuleiro(); //Reseta as casas do tabuleiro e o vetor retirando os pointEvents
        casas.classList.remove("pointEvents"); //remove o pointEvents da ul
        contador = 0; //reseta o contador de jogadas
        document.getElementsByTagName('img')[0].style.transform = "scale(0)";

        if(ganhou === "X"){
            jogador = "O"
            document.getElementById("mensagemJogador").innerHTML = "VEZ DO JOGADOR <strong>O</strong>";
            document.getElementById("jogadorO").classList.add("borderBottom");
            document.getElementById("jogadorX").classList.remove("borderBottom");
        }else if(ganhou === "O"){
            jogador == "X"
            document.getElementById("mensagemJogador").innerHTML = "VEZ DO JOGADOR <strong>X</strong>";
            document.getElementById("jogadorX").classList.add("borderBottom");
            document.getElementById("jogadorO").classList.remove("borderBottom");
        }else if(ganhou === "V"){
            var conta = Math.floor((Math.random() * 2) +1)
            if(conta == 1) {
                jogador = "O"
                document.getElementById("mensagemJogador").innerHTML = "VEZ DO JOGADOR <strong>O</strong>";
                document.getElementById("jogadorO").classList.add("borderBottom");
                document.getElementById("jogadorX").classList.remove("borderBottom");
            }else if(conta == 2){
                jogador == "X"
                document.getElementById("mensagemJogador").innerHTML = "VEZ DO JOGADOR <strong>X</strong>";
                document.getElementById("jogadorX").classList.add("borderBottom");
                document.getElementById("jogadorO").classList.remove("borderBottom");
            }
        }

        document.getElementsByClassName("linhaHorizontal")[0].style.width = "0";
        document.getElementsByClassName("linhaHorizontal")[0].style.height = "5px";
        document.getElementsByClassName("linhaHorizontal")[0].style.left = "16px";
        document.getElementsByClassName("linhaHorizontal")[0].style.top = "0";
        document.getElementsByClassName("linhaHorizontal")[0].style.backgroundColor = "transparent";
        document.getElementsByClassName("linhaHorizontal")[0].style.removeProperty("transition");
        document.getElementsByClassName("linhaDiagonal")[0].style.width = "0";
        document.getElementsByClassName("linhaHorizontal")[0].style.transform= "rotate(0deg)";

        document.getElementsByClassName("linhaHorizontal")[0].classList.remove("linhaHorizontal1", "linhaHorizontal2", "linhaHorizontal3", "linhaHorizontalHelper", "bg-red");
        document.getElementsByClassName("linhaHorizontal")[0].classList.remove("linhaVertical1", "linhaVertical2", "linhaVertical3", "linhaVerticalHelper", "bg-red");
        document.getElementsByClassName("linhaHorizontal")[0].classList.remove("linhaDiagonal1", "linhaDiagonal2", "linhaDiagonalHelper");
        document.getElementsByClassName("linhaDiagonal")[0].classList.remove("linhaDiagonalDentro", "bg-red");
}

function resetarTabuleiro() {
    for(var x = 0; x <= 8; x++){
        tabuleiro[x] = "";
        console.log(tabuleiro[x]);

    }

    document.getElementById("casa0").innerText = null;
    document.getElementById("casa0").classList.remove("pointEvents");

    document.getElementById("casa1").innerText = null;
    document.getElementById("casa1").classList.remove("pointEvents");

    document.getElementById("casa2").innerText = null;
    document.getElementById("casa2").classList.remove("pointEvents");

    document.getElementById("casa3").innerText = null;
    document.getElementById("casa3").classList.remove("pointEvents");

    document.getElementById("casa4").innerText = null;
    document.getElementById("casa4").classList.remove("pointEvents");

    document.getElementById("casa5").innerText = null;
    document.getElementById("casa5").classList.remove("pointEvents");

    document.getElementById("casa6").innerText = null;
    document.getElementById("casa6").classList.remove("pointEvents");

    document.getElementById("casa7").innerText = null;
    document.getElementById("casa7").classList.remove("pointEvents");

    document.getElementById("casa8").innerText = null;
    document.getElementById("casa8").classList.remove("pointEvents");
}

function pintarGanhador() {
    //FAZER LINHA NA HORIZONTAL
    if(((tabuleiro[0] === "X") && (tabuleiro[1] === "X") && (tabuleiro[2] === "X")) || ((tabuleiro[0] === "O") && (tabuleiro[1] === "O") && (tabuleiro[2] === "O"))) {
        document.getElementsByClassName("linhaHorizontal")[0].classList.add("linhaHorizontal1", "linhaHorizontalHelper", "bg-red");
    }else if(((tabuleiro[3] === "X") && (tabuleiro[4] === "X") && (tabuleiro[5] === "X")) || ((tabuleiro[3] === "O") && (tabuleiro[4] === "O") && (tabuleiro[5] === "O"))){
        document.getElementsByClassName("linhaHorizontal")[0].classList.add("linhaHorizontal2", "linhaHorizontalHelper", "bg-red");
    }else if(((tabuleiro[6] === "X") && (tabuleiro[7] === "X") && (tabuleiro[8] === "X")) || ((tabuleiro[6] === "O") && (tabuleiro[7] === "O") && (tabuleiro[8] === "O"))){
        document.getElementsByClassName("linhaHorizontal")[0].classList.add("linhaHorizontal3", "linhaHorizontalHelper", "bg-red");
    //FAZER LINHA NA VERTICAL
    }else if(((tabuleiro[0] === "X") && (tabuleiro[3] === "X") && (tabuleiro[6] === "X")) || ((tabuleiro[0] === "O") && (tabuleiro[3] === "O") && (tabuleiro[6] === "O"))){
        document.getElementsByClassName("linhaHorizontal")[0].classList.add("linhaVertical1", "linhaVerticalHelper", "bg-red");
    }else if(((tabuleiro[1] === "X") && (tabuleiro[4] === "X") && (tabuleiro[7] === "X")) || ((tabuleiro[1] === "O") && (tabuleiro[4] === "O") && (tabuleiro[7] === "O"))){
        document.getElementsByClassName("linhaHorizontal")[0].classList.add("linhaVertical2", "linhaVerticalHelper", "bg-red");
    }else if(((tabuleiro[2] === "X") && (tabuleiro[5] === "X") && (tabuleiro[8] === "X")) || ((tabuleiro[2] === "O") && (tabuleiro[5] === "O") && (tabuleiro[8] === "O"))){
        document.getElementsByClassName("linhaHorizontal")[0].classList.add("linhaVertical3", "linhaVerticalHelper", "bg-red");

        //FAZER LINHA NA DIAGONAL
    }else if(((tabuleiro[0] === "X") && (tabuleiro[4] === "X") && (tabuleiro[8] === "X")) || ((tabuleiro[0] === "O") && (tabuleiro[4] === "O") && (tabuleiro[8] === "O"))){
        document.getElementsByClassName("linhaHorizontal")[0].classList.add("linhaDiagonal1", "linhaDiagonalHelper");
        document.getElementsByClassName("linhaDiagonal")[0].classList.add("linhaDiagonalDentro", "bg-red");

    }else if(((tabuleiro[2] === "X") && (tabuleiro[4] === "X") && (tabuleiro[6] === "X")) || ((tabuleiro[2] === "O") && (tabuleiro[4] === "O") && (tabuleiro[6] === "O"))){
        document.getElementsByClassName("linhaHorizontal")[0].classList.add("linhaDiagonal2", "linhaDiagonalHelper");
        document.getElementsByClassName("linhaDiagonal")[0].classList.add("linhaDiagonalDentro", "bg-red");
    }


}