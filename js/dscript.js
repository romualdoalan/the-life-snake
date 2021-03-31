var canvas;
var direcao;
var edadicolev;
var cobrinha = new Array(new Array());;
var up = true;
var upaux = true;
var reiniciarGame = false;
var animacao;
var verificacaoCobrinha;
var ativadorVerficador;
var itens = [];
var dificuldade = 500;
var HScore = 0, limpar = false;
var win, lose, pick, clear, bg, slow, bg2;
var qtdPretinhas = 40;
var trocaCenario = false;
var mostraTexto = false;
var macazinha = 0;
var keycodeAnterior;
var verificaJogo = false;
var xCabeca;
var yCabeca;
function pararJogo() {
    verificaJogo = false;
    lose = new Audio('lose.mp3');
    lose.play();
    bg.pause();
    bg2.play();
    clearInterval(verificaCobrinha);
    clearInterval(animacao);
    if (HScore <= ((cobrinha.length - 2) * 10)) {
        setCookie('score', ((cobrinha.length - 2) * 10), 365);
    }
    $("canvas").css("background-color", "#d1d0a0a1");
    canvas.fillStyle = "#fff";
    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#ff0',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 20,
        fontFamily: 'UBUNTU, sans-serif',
        text: 'VOCÊ MORREU ( ._.)',
        x: 400,
        y: 240,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#0dd',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 20,
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'Pressione [ENTER] para reiniciar',
        x: 400,
        y: 310,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    canvas.drawText({
        fillStyle: '#111',
        shadowColor: '#100',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 14,
        fontFamily: 'Trebuchet MS, sans-serif',
        text: '[ESPAÇO]\t\t\t\t\t\t\t\t\t\t\t\t\t[SHIFT]',
        x: 400,
        y: 400,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#ff0',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 18,
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'Instruções\t\t\t\t\t\t\t\tSobre',
        x: 398,
        y: 420,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    reiniciarGame = true;
}

function desenhaPlayer(xCabeca, yCabeca) {

    if (((cobrinha.length - 2) * 10) > HScore) {
        HScore = ((cobrinha.length - 2) * 10);
    }
    $("#score").text('' + ((cobrinha.length - 2) * 10) + '');
    $("#highscore").text('' + HScore + '');

    canvas.drawRect({
        fillStyle: '#162',
        strokeStyle: '#000',
        strokeWidth: 0.1,
        x: xCabeca,
        y: yCabeca,
        width: 10,
        height: 10
    });
    for (var i = 1; i < cobrinha.length; i++) {
        canvas.drawRect({
            fillStyle: '#180',
            strokeStyle: '#000',
            strokeWidth: 0.2,
            x: cobrinha[i][0],
            y: cobrinha[i][1],
            width: 9,
            height: 9
        });
    }
    //bordas
    canvas.drawRect({
        fillStyle: '#000',
        strokeStyle: '#000',
        x: 0,
        y: 250,
        width: 6,
        height: 500
    });
    canvas.drawRect({
        fillStyle: '#000',
        strokeStyle: '#000',
        x: 800,
        y: 250,
        width: 6,
        height: 500
    });
    canvas.drawRect({
        fillStyle: '#000',
        strokeStyle: '#000',
        x: 400,
        y: 0,
        width: 800,
        height: 6
    });
    canvas.drawRect({
        fillStyle: '#000',
        strokeStyle: '#000',
        x: 400,
        y: 500,
        width: 798,
        height: 6
    });
}
function atualizaCobrinha(xCabeca, yCabeca) {
    cobrinha[0][0] = xCabeca;
    cobrinha[0][1] = yCabeca;
    for (var i = cobrinha.length - 1; i >= 1; i--) {
        cobrinha[i][0] = cobrinha[i - 1][0];
        cobrinha[i][1] = cobrinha[i - 1][1];

    }
}

function verificaCobrinha(xCabeca, yCabeca) {
    for (var i = 2; i < cobrinha.length; i++) {
        if (xCabeca == cobrinha[i][0] && yCabeca == cobrinha[i][1]) {
            pararJogo();
            clearInterval(this);
        }
    }
	/* if(mostraTexto){
		canvas.drawText({
					fillStyle: '#fff',
					shadowColor: '#0dd',
					shadowBlur: 1,
					fontStyle: 'bold',
					fontSize: 16,
					fontFamily: 'Trebuchet MS, sans-serif',
					text: 'Acontece que nem tudo dá certo quando se está com muito pressa. \nO medo de perder nos faz querer desacelerar... e desaceleramos. Mas, toda a correia que passamos, não nos deixou dedicar atenção no nosso presente. Agora ele se foi e as informações com ele também se foram. De qual maneira podemos sair desse momento apenas dedicando atenção no nosso presente?',
					x: 400,
					y: 280,
					align: 'center',
					maxWidth: 600,
					lineHeight: 2
				});
	} */

    for (var i = 0; i < itens.length; i++) {
        if (xCabeca == itens[i].x && yCabeca == itens[i].y && itens[i].tipo < dificuldade) {
            criarItem(2, xCabeca, yCabeca);
            pick.play();
            cobrinha.push([-10, -10]);
            itens[i].x = -100;
            itens[i].y = -100
            itens[i].tipo = 3000;
            //aumenta edadicolev a cada 50 pontos.
            if (((cobrinha.length - 2) % 5) == 0 && edadicolev > 30) {
                edadicolev -= 10;
                win.play();
                clearInterval(animacao);
                animacao = setInterval(quadro, edadicolev);
            }
			 if (edadicolev == 180 && trocaCenario == false) {
				console.log("entrou 190");
				mostraTexto=true;
				trocaCenario=true;
                edadicolev = 10000;
                win.play();
				$("canvas").css("background-color","rgba(0, 0, 0, 1)");
				bg2.play();
				bg.pause();
				canvas.drawText({
					fillStyle: '#fff',
					shadowColor: '#0dd',
					shadowBlur: 1,
					fontStyle: 'bold',
					fontSize: 16,
                    fontFamily: 'Trebuchet MS, sans-serif',
                    text:'Consegue sair dessa?',
					//text: 'Acontece que nem tudo dá certo quando se está com muito pressa. \nO medo de perder nos faz querer desacelerar... e desaceleramos. Mas, toda a correia que passamos, não nos deixou dedicar atenção no nosso presente. Agora ele se foi e as informações com ele também se foram. De qual maneira podemos sair dessa apenas dedicando atenção no nosso presente?',
					x: 400,
					y: 280,
					align: 'center',
					maxWidth: 600,
					lineHeight: 2
                });
                macazinha=-1
                clearInterval(animacao);
				setTimeout(function(){mostraTexto=false}, 25000);
				setTimeout(function(){animacao = setInterval(quadro, edadicolev);}, Number.MAX_VALUE);
				  
            }else{
				if(edadicolev == 10000 && trocaCenario == true && macazinha==-1) {
                    console.log("entrou 230");
                    macazinha=0;
					trocaCenario=false;
					edadicolev = 140;
					win.play();
					$("canvas").css("background-color","#fbf16398");
					bg2.load();
					bg.play();
					clearInterval(animacao);
					animacao = setInterval(quadro, edadicolev);
				}
            } 



        } else if (xCabeca == itens[i].x && yCabeca == itens[i].y && itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
            pararJogo();
            clearInterval(this);
        } else if (xCabeca == itens[i].x && yCabeca == itens[i].y && ((cobrinha.length - 2) * 10) > 180 && limpar == true && itens[i].tipo == 2000) {
            limpar = false;
            for (var i = 0; i < itens.length; i++) {
                if (itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
                    itens[i].x = -100;
                    itens[i].y = -100;
                }
                if (itens[i].tipo == 2000) {
                    itens[i].x = -100;
                    itens[i].y = -100;
                    itens[i].tipo = dificuldade + 1;
                }
            }

            clear.play();
        } else
            if (xCabeca == itens[i].x && yCabeca == itens[i].y && limpar == true && itens[i].tipo == 2000) {
                limpar = false;
                var testeDeSorte = Math.random() * 1000;
                if (testeDeSorte = 14) {
                    edadicolev = 140;
                    for (var i = 0; i < itens.length; i++) {
                        if (itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
                            itens[i].x = -100;
                            itens[i].y = -100;
                        }
                        if (itens[i].tipo == 2000) {
                            itens[i].x = -100;
                            itens[i].y = -100;
                            itens[i].tipo = dificuldade + 1;
                        }
                    }

                } else {
                    for (var i = 0; i < itens.length; i++) {
                        if (itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
                            itens[i].x = -100;
                            itens[i].y = -100;
                        }
                        if (itens[i].tipo == 2000) {
                            itens[i].x = -100;
                            itens[i].y = -100;
                            itens[i].tipo = dificuldade + 1;
                        }
                    }

                }
                clear.play();
            }

    }
}
var direcoes = [37, 38, 39, 40, 65, 68, 87, 83];

var verMovimento = direcao;
var contQuadros = 1;

function movimentaPlayer(keyCode) {
    console.log(keyCode + " - " + verMovimento + " - " + direcao)


    if (keyCode == direcao && direcoes.includes(keyCode)) {

        if (keyCode == 37 || keyCode == 65) {
            if (direcao != 39 && direcao != 68) {
                canvas.clearCanvas();
                direcao = keyCode;
                xCabeca = cobrinha[0][0] - 10;
                yCabeca = cobrinha[0][1];
                verMovimento = direcao;
                verificaCobrinha(xCabeca, yCabeca);
                desenhaPlayer(xCabeca, yCabeca);
                atualizaCobrinha(xCabeca, yCabeca);

            }
        } if (keyCode == 38 || keyCode == 87) {
            if (direcao != 40 && direcao != 83) {
                canvas.clearCanvas();
                xCabeca = cobrinha[0][0];
                yCabeca = cobrinha[0][1] - 10;
                direcao = keyCode;
                verMovimento = direcao;
                verificaCobrinha(xCabeca, yCabeca);
                desenhaPlayer(xCabeca, yCabeca);
                atualizaCobrinha(xCabeca, yCabeca);

            }
        } if (keyCode == 39 || keyCode == 68) {
            if (direcao != 37 && direcao != 65) {

                canvas.clearCanvas();
                xCabeca = cobrinha[0][0] + 10;
                yCabeca = cobrinha[0][1];
                direcao = keyCode;
                verMovimento = direcao;
                verificaCobrinha(xCabeca, yCabeca);
                desenhaPlayer(xCabeca, yCabeca);
                atualizaCobrinha(xCabeca, yCabeca);
            }
        } if (keyCode == 40 || keyCode == 83) {
            if (direcao != 38 && direcao != 87) {

                canvas.clearCanvas();
                xCabeca = cobrinha[0][0];
                yCabeca = cobrinha[0][1] + 10;
                direcao = keyCode;
                verMovimento = direcao;
                verificaCobrinha(xCabeca, yCabeca);
                desenhaPlayer(xCabeca, yCabeca);
                atualizaCobrinha(xCabeca, yCabeca);
            }
        }
        //  console.log(xCabeca + " " + yCabeca);
    } else {

        if (keyCode == 37 || keyCode == 65) {
            if (direcao != 39 && direcao != 68)
                if (verMovimento != 39 && verMovimento != 68)
                    direcao = keyCode;

        } else if (keyCode == 38 || keyCode == 87) {
            if (direcao != 40 && direcao != 83)
                if (verMovimento != 40 && verMovimento != 83)
                    direcao = keyCode;

        } else if (keyCode == 39 || keyCode == 68) {
            if (direcao != 37 && direcao != 65)
                if (verMovimento != 37 && verMovimento != 65)
                    direcao = keyCode;

        } else if (keyCode == 40 || keyCode == 83) {
            if (direcao != 38 && direcao != 87)
                if (verMovimento != 38 && verMovimento != 87)
                    direcao = keyCode;

        }
    }
    for (var i = 0; i < itens.length; i++) {
        if (itens[i].tipo < dificuldade) {
            $('canvas').drawImage({
                source: 'apple.png',
                x: itens[i].x, y: itens[i].y,
            });
        }
        if (itens[i].tipo >= dificuldade && itens[i].tipo <= 1000) {
            $('canvas').drawImage({
                source: 'bomb.png',
                x: itens[i].x,
                y: itens[i].y,
            });
        }
        if (itens[i].tipo == 2000) {
            $('canvas').drawImage({
                source: 'golden.png',
                x: itens[i].x,
                y: itens[i].y,
            });
        }
    }
}

function quadro() {
    var verificaMacas = false;
    var contaDificuldade = 0;
    var itemUP = false;

    for (var i = 0; i < itens.length; i++) {
        if (itens[i].tipo < dificuldade && itens[i].tipo > 0) {
            verificaMacas = true;
        }
        if (itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
            contaDificuldade++;
        }
        if (itens[i].tipo == 2000) {
            itemUP = true;
        }

    }
    /* console.log("edadicolev= "+edadicolev); 
    console.log("QtdPretinha= "+qtdPretinhas);
    console.log("contaDificuldade= "+contaDificuldade); */
    if (contaDificuldade >= qtdPretinhas && edadicolev <= 150 && limpar == false && itemUP == false) {
        qtdPretinhas = Math.floor(qtdPretinhas * 1.7);
        var auxX = Math.floor(Math.random() * 79 + 1) * 10;
        var auxY = Math.floor(Math.random() * 49 + 1) * 10;
        var igual = false;
        for (var i = 0; i < itens.length; i++) {
            if (itens[i].x == auxX && itens[i].y == auxY) {
                igual = true;
                i = 0;
                auxX = Math.floor(Math.random() * 79 + 1) * 10;
                auxY = Math.floor(Math.random() * 49 + 1) * 10;
            }
        }
        for (var i = 0; i < cobrinha.length; i++) {
            if (cobrinha[i][0] == auxX && cobrinha[i][1] == auxY) {
                igual = true;
                i = 0;
                auxX = Math.floor(Math.random() * 79 + 1) * 10;
                auxY = Math.floor(Math.random() * 49 + 1) * 10;
            }
        }
        itens.push({
            x: Math.floor(Math.random() * 79 + 1) * 10,
            y: Math.floor(Math.random() * 49 + 1) * 10,
            tipo: 2000
        });
        limpar = true;
    }
    if (verificaMacas == false) {
        criarItem(2, cobrinha[1][0], cobrinha[1][1]);
    }

    if (cobrinha[0][1] > 490) {
        pararJogo();
    } else

        if (cobrinha[0][1] < 10) {

            pararJogo();
        } else
            if (cobrinha[0][0] > 790) {

                pararJogo();
            } else
                if (cobrinha[0][0] < 10) {
                    pararJogo();
                } else
                    movimentaPlayer(direcao);
}

document.onkeydown = function (event) {

    if (reiniciarGame && window.event.keyCode == 13) {
        canvas.clearCanvas();
        reiniciarGame = false;
        direcao = 39;
        keycodeAnterior = 39;
        bg2.load();
        iniciaJogo();
    } else {
        if (reiniciarGame == false) {
            var keyCode;
            var flag = true;
            if (event == null) {
                keyCode = window.event.keyCode;
            } else {
                keyCode = event.keyCode;
            }
            if( window.event.keyCode==16 && ativadorVerficador == true){
                canvas.clearCanvas();
                
            
                canvas.drawText({
                    fillStyle: '#111',
                    shadowColor: '#100',
                    shadowBlur: 1,
                    fontStyle: 'bold',
                    fontSize: 14,
                    fontFamily: 'Trebuchet MS, sans-serif',
                    text: '\t\t[ENTER]\t\t\t\t\t\t\t\t\t\t\t\t\t[ESPAÇO]\t\t\t\t\t\t\t\t\t\t\t<[SHIFT]>',
                    x: 400,
                    y: 400,
                    align: 'center',
                    maxWidth: 600,
                    lineHeight: 2
                });
                canvas.drawText({
                    fillStyle: '#000',
                    shadowColor: '#f00',
                    shadowBlur: 1,
                    fontStyle: 'bold',
                    fontSize: 18,
                    fontFamily: 'Trebuchet MS, sans-serif',
                    text: '\tIniciar\t\t\t\t\t\t\t\tInstruções\t\t\t\t\t\t\t\tSobre',
                    x: 398,
                    y: 420,
                    align: 'center',
                    maxWidth: 600,
                    lineHeight: 2
                });
            
            }
            if( window.event.keyCode==32 && ativadorVerficador == true){
                canvas.clearCanvas();
                
                canvas.drawText({
                    fillStyle: '#111',
                    shadowColor: '#100',
                    shadowBlur: 1,
                    fontStyle: 'bold',
                    fontSize: 14,
                    fontFamily: 'Trebuchet MS, sans-serif',
                    text: '[ENTER]\t\t\t\t\t\t\t\t\t\t\t<[ESPAÇO]>\t\t\t\t\t\t\t\t\t\t\t[SHIFT]',
                    x: 400,
                    y: 400,
                    align: 'center',
                    maxWidth: 600,
                    lineHeight: 2
                });
                canvas.drawText({
                    fillStyle: '#000',
                    shadowColor: '#f00',
                    shadowBlur: 1,
                    fontStyle: 'bold',
                    fontSize: 18,
                    fontFamily: 'Trebuchet MS, sans-serif',
                    text: '\tIniciar\t\t\t\t\t\t\t\tInstruções\t\t\t\t\t\t\t\tSobre',
                    x: 398,
                    y: 420,
                    align: 'center',
                    maxWidth: 600,
                    lineHeight: 2
                });
            
            }
    


            if (keyCode == 13 && ativadorVerficador == true) {
                iniciaJogo();
                ativadorVerficador = false;
            } else {

                movimentaPlayer(keyCode);
            }
        


        }
    }
}

function criarItem(qtd, Cabecax, Cabecay) {
    for (var k = 0; k < qtd; k++) {
        var auxX = Math.floor(Math.random() * 79 + 1) * 10;
        var auxY = Math.floor(Math.random() * 49 + 1) * 10;
        var igual = false;
        for (var i = 0; i < itens.length; i++) { //verifica se já não existe um item nessa posição.
            if (itens[i].x == auxX && itens[i].y == auxY) {
                igual = true;
                break;
            }
        }
        for (var i = 0; i < cobrinha.length; i++) { //verifica se não é a posição das partes da cobrinha
            if (cobrinha[i][0] == auxX && cobrinha[i][1] == auxY) {
                igual = true;
                break;
            }
        }
        if (((auxY >= (Cabecay - 90)) && (auxY <= (Cabecay + 90))) && ((auxX >= (Cabecax - 90)) && (auxX <= (Cabecax + 90)))) {
            k = k - 1;
        } else {
            if (igual == false) {
                itens.push({
                    x: auxX,
                    y: auxY,
                    tipo: (Math.random() * 1000)
                });
            } else {
                k = k - 1;
            }
        }
    }
}

function iniciaJogo() {
    if (verificaJogo == false) {


        $("canvas").css("background-color", "#fbf16398");
        verificaJogo = false;
        checkCookie();
        upaux = true;
        up = true;
        lose.pause();
        start = new Audio('start.mp3');
        start.play();
        itens = [];
        bg.play();
        edadicolev = 200;
        direcao = 39;
        cobrinha = [
            [Math.floor(Math.random() * (70 - 10) + 10) * 10, Math.floor(Math.random() * (40 - 10) + 10) * 10],
            [-10, -10]
        ];
        xCabeca = cobrinha[0][0];
        yCabeca = cobrinha[0][1];
        canvas.clearCanvas();

        animacao = setInterval(quadro, edadicolev);
        //   verificacaoCobrinha = setInterval(verificaCobrinha, 10);
    }
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    HScore = getCookie("score");

    if (HScore == '') {
        HScore = 0;
    }
}

window.onload = function () {

    win = new Audio('sounds/win.mp3');
    lose = new Audio('sounds/lose.mp3');
    pick = new Audio('sounds/collect.mp3');
    slow = new Audio('sounds/slow.mp3');
    clear = new Audio('sounds/clear.mp3');
    bg = new Audio('sounds/bg.mp3');
    bg.load()
    bg2 = new Audio('sounds/bgnew.mp3');
    bg2.load()
    canvas = $('#cenario');
    canvas.drawText({
        fillStyle: '#050',
        strokeStyle: '#25a',
        shadowColor: '#f00',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 30,
        fontFamily: 'UBUNTU, sans-serif',
        text: 'THE LIFE',
        x: 400,
        y: 280,
        radius: 110,
        align: 'center',
        maxWidth: 600,
    });
    canvas.drawText({
        fillStyle: '#050',
        strokeStyle: '#25a',
        shadowColor: '#f00',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 40,
        fontFamily: 'UBUNTU, sans-serif',
        text: 'Snake',
        x: 400,
        y: 220,
        align: 'center',
        maxWidth: 600,
    });

    canvas.drawText({
        fillStyle: '#111',
        shadowColor: '#100',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 14,
        fontFamily: 'Trebuchet MS, sans-serif',
        text: '[ENTER]\t\t\t\t\t\t\t\t\t\t\t\t\t[ESPAÇO]\t\t\t\t\t\t\t\t\t\t\t\t\t[SHIFT]',
        x: 400,
        y: 400,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#f00',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 18,
        fontFamily: 'Trebuchet MS, sans-serif',
        text: '\tIniciar\t\t\t\t\t\t\t\tInstruções\t\t\t\t\t\t\t\tSobre',
        x: 398,
        y: 420,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    ativadorVerficador = true;
    modal();
}