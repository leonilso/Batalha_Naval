let zerada = [];
let transparente;
let placarjogador = 0;
let placarcomputador = 0;
let tocou = false

let texturaAtual;

function preload() {
  texturaSubmarino = loadImage("sprite.png");
  texturaAgua = loadImage("agua.png")
  texturaExplosao = loadImage("explosao.png")
  texturaFundo = loadImage("fundo.png")
  texturaAguaexplosao = loadImage("aguaexplosao.png")
  texturaCanoa = loadImage("canoa.png")
  texturaVeleiro = loadImage("veleiro.png")
  texturaNavio = loadImage("navio.png")
  texturaCargueiro = loadImage("cargueiro.png")
  texturaAguapassada = loadImage("aguapassada.png")
  
  texturaPassou = loadImage("gta.jpeg")
  texturaFalhou = loadImage("gtafalhou.png")
  somExplosao = loadSound("explosao.mp3")
  somPassou = loadSound("passou.mp3")
  somFalhou = loadSound("title.mp3")
  texturaAtual = texturaAgua;
}


function pintar(grade, gradePos) {
  if (somaEmbarcacoes == 15) {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        
        if (grade[i][j] == 1) {
          // fill(transparente);
          fill("black");
              image(
      texturaSubmarino,
      gradePos[i][j][0],
      gradePos[i][j][1],
      20,
      20);
          // rect(gradePos[i][j][0], gradePos[i][j][1], 20, 20);
        } else if(grade[i][j] == 0){
      image(
      texturaAgua,
      gradePos[i][j][0],
      gradePos[i][j][1],
      20,
      20);
          // fill(0, 255, 255);
          // rect(gradePos[i][j][0], gradePos[i][j][1], 20, 20);
                } else if(grade[i][j] == 3){
                                image(
      texturaExplosao,
      gradePos[i][j][0],
      gradePos[i][j][1],
      20,
      20);
          // fill("red")
          // rect(gradePos[i][j][0], gradePos[i][j][1], 20, 20);
        } else if(grade[i][j] == 4){
                        image(
      texturaAguaexplosao,
      gradePos[i][j][0],
      gradePos[i][j][1],
      20,
      20);
          // fill("blue")
          // rect(gradePos[i][j][0], gradePos[i][j][1], 20, 20);
        }
      //         fill("white")
      // text(grade[i][j], gradePosjogador[i][j][0]+10, gradePosjogador[i][j][1]+10 )
      }
    }
  }
}

function pintarComputador(grade, gradePos){
  for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        // if (grade[i][j] == 1) {
          // fill(transparente);
          // fill("black");
          // rect(gradePos[i][j][0], gradePos[i][j][1], 20, 20);
        // } else 
          if(grade[i][j] == 0){
                  image(
      texturaAtual,
      gradePos[i][j][0],
      gradePos[i][j][1],
      20,
      20);
          // fill(0, 255, 255);
          // rect(gradePos[i][j][0], gradePos[i][j][1], 20, 20);
        } else if(grade[i][j] == 3){
        image(
      texturaExplosao,
      gradePos[i][j][0],
      gradePos[i][j][1],
      20,
      20);
          // fill("red")
          // rect(gradePos[i][j][0], gradePos[i][j][1], 20, 20);
        } else if(grade[i][j] == 4){
                                  image(
      texturaAguaexplosao,
      gradePos[i][j][0],
      gradePos[i][j][1],
      20,
      20);
          // fill("blue")
          // rect(gradePos[i][j][0], gradePos[i][j][1], 
          //      20, 20);
        }
      //   texturaAtual = texturaAgua
      //           if(mouseX > gradePos[i][j][0] && mouseX < gradePos[i][j][0]+20 && mouseY > gradePos[i][j][1]+20 && mouseY < gradePos[i][j][1] ){     
      // texturaAtual = texturaAguapassada
      //   }
      //     fill("white")
      // text(grade[i][j], gradePosjogador[i][j][0]+10+425, gradePosjogador[i][j][1]+10 )
  }
  }
  }

function verificarNavio(x, y, tamanho) {
  let carregando;
  if (
    mouseX > x &&
    mouseX < x + ladrilho &&
    mouseY > y &&
    mouseY < y + ladrilho * tamanho &&
    !carregandoSubmarino &&
    !carregandoCanoa &&
    !carregandoVeleiro &&
    !carregandoNavio &&
    !carregandoCargueiro
  ) {
    carregando = true;
  }
  return carregando;
}

function keyPressed() {
  if (key === " " && carregandoSubmarino) {
    rotacaoSubmarino = !rotacaoSubmarino;
  }
  if (key === " " && carregandoCanoa) {
    rotacaoCanoa = !rotacaoCanoa;
  }
  if (key === " " && carregandoVeleiro) {
    rotacaoVeleiro = !rotacaoVeleiro;
  }
  if (key === " " && carregandoNavio) {
    rotacaoNavio = !rotacaoNavio;
  }
  if (key === " " && carregandoCargueiro) {
    rotacaoCargueiro = !rotacaoCargueiro;
  }
}

function mousePressed() {
  carregandoSubmarino = verificarNavio(xSubmarino, ySubmarino, 1);
  carregandoCanoa = verificarNavio(xCanoa, yCanoa, 2);
  carregandoVeleiro = verificarNavio(xVeleiro, yVeleiro, 3);
  carregandoNavio = verificarNavio(xNavio, yNavio, 4);
  carregandoCargueiro = verificarNavio(xCargueiro, yCargueiro, 5);
}

function mouseClicked(){
  if (mouseX > 170 && mouseX < 230 && mouseY > 560 && mouseY < 590 && escolher) {
    botao();
  } 
  // tiro();
}
function tiro(){
  if(!escolher && mouseX > 425 && mouseX < 825 && mouseY > 0 && mouseY < 400){
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (gradeComputador[i][j] == 1 && mouseX > gradePoscomputador[i][j][0] && mouseX < gradePoscomputador[i][j][0] + 20 && mouseY > gradePoscomputador[i][j][1] &&  mouseY < gradePoscomputador[i][j][1] + 20){      
          gradeComputador[i][j] = 3
          placarjogador += 1;
          inteligencia();
        } else if(gradeComputador[i][j] == 0 && mouseX > gradePoscomputador[i][j][0] && mouseX < gradePoscomputador[i][j][0] + 20 && mouseY > gradePoscomputador[i][j][1] &&  mouseY < gradePoscomputador[i][j][1] + 20){
          gradeComputador[i][j] = 4
          // somExplosao.play();
            inteligencia();
        }
      }
    }
  }
}

function botao(){
    somaEmbarcacoes = 0;
    gradeJogador.map(row => row.fill(0));
    // verficaCondicoes(1, rotacaoSubmarino)
    carregar(xSubmarino, ySubmarino, rotacaoSubmarino, 1);
    // verficaCondicoes(2, rotacaoCanoa)
    carregar(xCanoa, yCanoa, rotacaoCanoa, 2);
    // verficaCondicoes(3, rotacaoVeleiro)
    carregar(xVeleiro, yVeleiro, rotacaoVeleiro, 3);
    // verficaCondicoes(4, rotacaoNavio)
    carregar(xNavio, yNavio, rotacaoNavio, 4);
    // verficaCondicoes(5, rotacaoCargueiro)
    carregar(xCargueiro, yCargueiro, rotacaoCargueiro, 5);
  if(erro){
    print("erro")
  }
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      somaEmbarcacoes += gradeJogador[i][j]
      if (somaEmbarcacoes == 15) {
          escolher = false;
      }
    }
  }
}

function mouseReleased() {
  carregandoSubmarino = false;
  carregandoCanoa = false;
  carregandoVeleiro = false;
  carregandoNavio = false;
  carregandoCargueiro = false;
}

function mouseDragged() {
  if (carregandoSubmarino) {
    movSubmarino();
  }
  if (carregandoCanoa) {
    movCanoa();
  }
  if (carregandoVeleiro) {
    movVeleiro();
  }
  if (carregandoNavio) {
    movNavio();
  }
  if (carregandoCargueiro) {
    movCargueiro();
  } 
  tiro();
}

function oceano() {
//   if(mouseX >= 425 && mouseY >= 0 && mouseX <= 825 && mouseY <= 400){
//     print("teste")
//     rect(Math.floor(mouseX/20)+425, Math.floor(mouseY/20), 20,20);
//       //      image(
//       // texturaAguapassada,
//       // Math.floor(mouseX/20)+425,
//       // Math.floor(mouseY/20),
//       // 20,
//       // 20);
// }
  
  text("Aperte Espaço para mudar a orientação do navio", 625, 550)
  fill(0, 255, 255)
  rect(425, 425, 80, 50)
  if(mouseX >= 425 && mouseY >= 0 && mouseX <= 825 && mouseY <= 400){
  fill("black")
  text("X", 445,440);
  text(Math.floor(mouseX/20)-20, 445, 460);
  text("Y", 485,440);
  text(Math.floor(mouseY/20)+1, 485,460)
  }
  fill(0, 255, 255)
  rect(25, 425, 80, 50)
  if(mouseX >= 0 && mouseY >= 0 && mouseX <= 400 && mouseY <= 400){
  fill("black")
  text("X", 45,440);
  text(Math.floor(mouseX/20)+1, 45, 460);
  text("Y", 85,440);
  text(Math.floor(mouseY/20)+1, 85 ,460)
  }
  fill("black");
  rect(170, 560, 60, 30);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Play", 200, 575);
  fill(0, 255, 255);
  image(texturaFundo,
        0,
        0,
        400,
        400
       )
    image(texturaFundo,
        425,
        0,
        400,
        400
       )
  // rect(0, 0, 400, 400);
  // rect(425, 0, 400, 400);
    for (let i = 0; i < larguraOceano + 1; i += 20) {
    fill("black")
    text(i/20, 412, i-10)
    text(i/20, i-10, 412)
    text(i/20 +1, i+425+10, 412)
    line(0, i, larguraOceano, i);
    line(i, 0, i, alturaOceano);
    line(0 + 425, i, larguraOceano + 425, i);
    line(i + 425, 0, i + 425, alturaOceano);
  }
}

function limpar(){
    if(placarcomputador == 15){
      clear();
      textSize(64);
    // texturaPassou
    // texturaFalhou
    // somExplosao
    // somPassou.play()
        if(!tocou){
          tocou = true
          somFalhou.play()
          
        }
      image(texturaFalhou, 200, 150)
      // text("Computador Venceu", 412, 300);
    } else if(placarjogador == 15){
        clear();
        textSize(64);
          if(!tocou){
          tocou = true
          somPassou.play()
          
        }
        image(texturaPassou, 200, 200)
        // text("Jogador Venceu", 412, 300);
    }
}


