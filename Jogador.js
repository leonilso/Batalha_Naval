let larguraOceano = 400;
let alturaOceano = 400;
let ladrilho = 20;
let gradePosjogador = [];
let gradeJogador = [];

let escolher = true;

// Embarcações

// Submarino
let texturaSubmarino;
let xSubmarino = 120;
let ySubmarino = 440;
let carregandoSubmarino = false;
let tamanhoSubmarino = ladrilho;
let alturaSubmarino = tamanhoSubmarino;
let larguraSubmarino = ladrilho;
let rotacaoSubmarino = false;

// Canoa
let xCanoa = 160;
let yCanoa = 440;
let carregandoCanoa = false;
let tamanhoCanoa = 2 * ladrilho;
let alturaCanoa = tamanhoCanoa;
let larguraCanoa = ladrilho;
let rotacaoCanoa = false;

// Veleiro
let xVeleiro = 200;
let yVeleiro = 440;
let carregandoVeleiro = false;
let tamanhoVeleiro = 3 * ladrilho;
let alturaVeleiro = tamanhoVeleiro;
let larguraVeleiro = ladrilho;
let rotacaoVeleiro = false;

// Navio
let xNavio = 240;
let yNavio = 440;
let carregandoNavio = false;
let tamanhoNavio = 4 * ladrilho;
let alturaNavio = tamanhoNavio;
let larguraNavio = ladrilho;
let rotacaoNavio = false;

// Cargueiro
let xCargueiro = 280;
let yCargueiro = 440;
let carregandoCargueiro = false;
let tamanhoCargueiro = 5 * ladrilho;
let alturaCargueiro = tamanhoCargueiro;
let larguraCargueiro = ladrilho;
let rotacaoCargueiro = false;

function iniciarJogador() {
  for (let i = 0; i < 20; i++) {
    gradeJogador[i] = [];
    gradePosjogador[i] = [];
    for (let j = 0; j < 20; j++) {
      gradeJogador[i][j] = 0;
      gradePosjogador[i][j] = [i * 20 , j * 20];
    }
  }
}


function embarcacoes() {
  if (escolher) {
    push();
    fill("black");
    rect(
      xSubmarino,
      ySubmarino,
      larguraSubmarino,
      alturaSubmarino
    );
    // rect(xSubmarino, ySubmarino, 20, 20);
    rect( xCanoa, yCanoa, larguraCanoa, alturaCanoa);
    rect(xVeleiro, yVeleiro, larguraVeleiro, alturaVeleiro);
    rect(xNavio, yNavio, larguraNavio, alturaNavio);
    rect(xCargueiro, yCargueiro, larguraCargueiro, alturaCargueiro);
    pop();
  }
}

function carregar(x, y, rotacao, tamanho) {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (gradePosjogador[i][j][0] == x && gradePosjogador[i][j][1] == y && !rotacao) {
          for (let k = 0; k < tamanho; k++){
            if(j+tamanho-1 < 20 && gradeJogador[i][j + k] != 1){
              gradeJogador[i][j + k] = 1;
            }else{
              erro = true;
            }
          }
        } else if (gradePosjogador[i][j][0] == x && gradePosjogador[i][j][1] == y && rotacao) {
          for (let k = 0; k < tamanho; k++){
            if(i+tamanho-1 < 20 && gradeJogador[i+k][j] != 1){
              gradeJogador[i + k][j] = 1;
            } else {
              erro = true;
            }
          }
        }
      }
    }
}

function movSubmarino() {
  if (carregandoSubmarino) {
    xSubmarino = mouseX;
    ySubmarino = mouseY;
    if (rotacaoSubmarino) {
      larguraSubmarino = tamanhoSubmarino;
      alturaSubmarino = ladrilho;
    } else if (!rotacaoSubmarino) {
      larguraSubmarino = ladrilho;
      alturaSubmarino = tamanhoSubmarino;
    }
  }
  xSubmarino = Math.floor(mouseX / 20) * 20;
  ySubmarino = Math.floor(mouseY / 20) * 20;
}

function movCanoa() {
  if (carregandoCanoa) {
    xCanoa = mouseX;
    yCanoa = mouseY;
    if (rotacaoCanoa) {
      larguraCanoa = tamanhoCanoa;
      alturaCanoa = ladrilho;
    } else if (!rotacaoCanoa) {
      larguraCanoa = ladrilho;
      alturaCanoa = tamanhoCanoa;
    }
  }
  xCanoa = Math.floor(mouseX / 20) * 20;
  yCanoa = Math.floor(mouseY / 20) * 20;
}

function movVeleiro() {
  if (carregandoVeleiro) {
    xVeleiro = mouseX;
    yVeleiro = mouseY;
    if (rotacaoVeleiro) {
      larguraVeleiro = tamanhoVeleiro;
      alturaVeleiro = ladrilho;
    } else if (!rotacaoVeleiro) {
      larguraVeleiro = ladrilho;
      alturaVeleiro = tamanhoVeleiro;
    }
  }
  xVeleiro = Math.floor(mouseX / 20) * 20;
  yVeleiro = Math.floor(mouseY / 20) * 20;
}

function movNavio() {
  if (carregandoNavio) {
    xNavio = mouseX;
    yNavio = mouseY;
    if (rotacaoNavio) {
      larguraNavio = tamanhoNavio;
      alturaNavio = ladrilho;
    } else if (!rotacaoNavio) {
      larguraNavio = ladrilho;
      alturaNavio = tamanhoNavio;
    }
  }
  xNavio = Math.floor(mouseX / 20) * 20;
  yNavio = Math.floor(mouseY / 20) * 20;
}

function movCargueiro() {
  if (carregandoCargueiro) {
    xCargueiro = mouseX;
    yCargueiro = mouseY;
    if (rotacaoCargueiro) {
      larguraCargueiro = tamanhoCargueiro;
      alturaCargueiro = ladrilho;
    } else if (!rotacaoCargueiro) {
      larguraCargueiro = ladrilho;
      alturaCargueiro = tamanhoCargueiro;
    }
  }
  xCargueiro = Math.floor(mouseX / 20) * 20;
  yCargueiro = Math.floor(mouseY / 20) * 20;
}



