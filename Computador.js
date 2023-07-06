
// funciona para verificar o fim do jogo
let somaEmbarcacoes = 0; 


// boleano para rodar o jogo
let rodar = false; 
let erro = false;

// vetor de posicoes para imprimir na tela, montar a grade, entre outros
let vetorPosicoes = [];

// vetor de direcoes (não está sendo usando)
let direcoes = ["cima", "baixo", "direita", "esquerda"]

// direcoes do computador
let direcaoComputador;
let posicoesComputador = [];

// verifica se ja foi posicionado todas as embarcacoes
let somaComputador = 0;

// serve para interromper o loop
let parar = false;

// vetor da grade do computador
let gradeComputador = [];

// vetor que relaciona as posicoes com a grade
let gradePoscomputador = [];

// tiro do computador
let tiroatual;

// tiro anterior (nao esta sendo usado)
let tiroanterior;

// vetor de provaveis lugares
let provaveislugares;

// vetor de tiros dados (nao está sendo usado)
let tirosdados = [];

// locais que ainda podem ser selecionados
let locais = [];

// verifica se foi dado dois tiros certos
let seguidos = false;


// cria o vetor de posicoes
function vetorPosicoesf(){
  for (let i = 0; i < 20; i++) {
    vetorPosicoes[i] = i
  }
  return vetorPosicoes;
}


// inicia a grade do computador
function iniciarComputador(){
  for (let i = 0; i < 20; i++) {
    gradeComputador[i] = [];
    gradePoscomputador[i] = [];
    for (let j = 0; j < 20; j++) {
      gradeComputador[i][j] = matrix[i][j];
      locais.push([i, j])
      gradePoscomputador[i][j] = [i * 20 + 425 , j * 20];
      somaComputador += gradeComputador[i][j];

    }
  }
  provaveislugares = [random(locais)];
}


// ATENÇÃO ESSA PARTE DO CÓDIGO NÃO FOI TERMINADA E FOI COPIADA DE OUTROS LOCAIS NÃO É DE AUTORIA PRÓPRIA

const matrix = Array.from(Array(20), () => Array(20).fill(0));

function isPositionAvailable(x, y, length, direction) {
  if (direction === 'horizontal') {
    for (let i = y; i < y + length; i++) {
      if (matrix[x][i] !== 0) {
        return false;
      }
    }
  } else if (direction === 'vertical') {
    for (let i = x; i < x + length; i++) {
      if (matrix[i][y] !== 0) {
        return false;
      }
    }
  }
  return true;
}

function markLine(x, y, length, direction) {
  if (direction === 'horizontal') {
    for (let i = y; i < y + length; i++) {
      matrix[x][i] = 1;
    }
  } else if (direction === 'vertical') {
    for (let i = x; i < x + length; i++) {
      matrix[i][y] = 1;
    }
  }
}

function getRandomDirection() {
  return Math.random() < 0.5 ? 'horizontal' : 'vertical';
}

function getRandomPosition(length, direction) {
  let x, y;
  if (direction === 'horizontal') {
    x = Math.floor(Math.random() * 20);
    y = Math.floor(Math.random() * (21 - length));
  } else if (direction === 'vertical') {
    x = Math.floor(Math.random() * (21 - length));
    y = Math.floor(Math.random() * 20);
  }
  return { x, y };
}

const lineLengths = [5, 4, 3, 2, 1];

for (let length of lineLengths) {
  let direction = getRandomDirection();
  let position = getRandomPosition(length, direction);

  while (!isPositionAvailable(position.x, position.y, length, direction)) {
    direction = getRandomDirection();
    position = getRandomPosition(length, direction);
  }

  markLine(position.x, position.y, length, direction);
}

// FIM DA PARTE COPIADA


// Criação da IA que comanda o computador
function inteligencia(){
  // boleano garantido que o tiro seja feito
  let tirodado = false
    // a inteligência só funciona quando o play for apertado
  if(!escolher){
    // enquanto um tiro não for escolhido ele não para de rodar
    while(!tirodado){
    // caso o vetor de provavies lugares fique vazio é adicionad um valor randomico das posições possíveis 
    if(provaveislugares == 0){
        provaveislugares = [random(locais)]
    }
    // inicia um tiro alterior
    tiroanterior = [0, 0];
    // inicia o tiro atual com base no vetor de provaveis lugares
    tiroatual = provaveislugares[0];
    // remove de provaveis lugares o tiro atual
    provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual); 

    // inicia a verificação
    // caso o tiro atual seja igual a zero
    if(gradeJogador[tiroatual[0]][tiroatual[1]] == 0){
      // Essa verificaçoes garantem a Ia sabe a direção das posições que devem ser armazenadas no vetor provaveis lugares
      if(tiroatual[0]+1 < 20 && tiroatual[0]-1 >= 0 && tiroatual[1]+1 < 20 && tiroatual[1]+1 >= 0 && seguidos){
        seguidos = false;
        if(gradeJogador[tiroatual[0]+1][tiroatual[1]] != 3 && gradeJogador[tiroatual[0]-1][tiroatual[1]] != 3 && gradeJogador[tiroatual[0]][tiroatual[1]+1] != 3 && gradeJogador[tiroatual[0]][tiroatual[1]-1] != 3){
          provaveislugares = []
        } else if(gradeJogador[tiroatual[0]+1][tiroatual[1]] == 3){
          provaveislugares = []
          provaveislugares.push([tiroatual[0]+2, tiroatual[1]]);
          provaveislugares.push([tiroatual[0]+3, tiroatual[1]]);
          provaveislugares.push([tiroatual[0]+4, tiroatual[1]]);
          provaveislugares.push([tiroatual[0]+5, tiroatual[1]]);
        } else if(gradeJogador[tiroatual[0]-1][tiroatual[1]] == 3){
          provaveislugares = []
          provaveislugares.push([tiroatual[0]-2, tiroatual[1]]);
          provaveislugares.push([tiroatual[0]-3, tiroatual[1]]);
          provaveislugares.push([tiroatual[0]-4, tiroatual[1]]);
          provaveislugares.push([tiroatual[0]-5, tiroatual[1]]);
        } else if(gradeJogador[tiroatual[0]][tiroatual[1]+1] == 3){
          provaveislugares = []
          provaveislugares.push([tiroatual[0], tiroatual[1]+2]);
          provaveislugares.push([tiroatual[0], tiroatual[1]+3]);
          provaveislugares.push([tiroatual[0], tiroatual[1]+4]);
          provaveislugares.push([tiroatual[0], tiroatual[1]+5]);
        } else if(gradeJogador[tiroatual[0]][tiroatual[1]-1] == 3){
          provaveislugares = []
          provaveislugares.push([tiroatual[0], tiroatual[1]-2]);
          provaveislugares.push([tiroatual[0], tiroatual[1]-3]);
          provaveislugares.push([tiroatual[0], tiroatual[1]-4]);
          provaveislugares.push([tiroatual[0], tiroatual[1]-5]);
        }
      }

      // O tirodado é alterado para verdadeiro o que grante a quebra do loop
      tirodado = true;
      // remove do array de todas as possibilidades o tiro atual
      locais = locais.filter(elemento => elemento !== tiroatual);
      // muda na grade do jogador o valor para 4 indicando que não há navio e o tiro foi dado
      gradeJogador[tiroatual[0]][tiroatual[1]] = 4
      
      //verifica se o tiro atual acertou uma embarcação
    } else if(gradeJogador[tiroatual[0]][tiroatual[1]] == 1){
      // O tirodado é alterado para verdadeiro o que grante a quebra do loop
      tirodado = true;

      if(tiroatual[0]+1 < 20 && gradeJogador[tiroatual[0]+1][tiroatual[1]] == 3){
        seguidos = true;
        provaveislugares = []
        provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]+2, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]-2, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]-3, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]+3, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]+4, tiroatual[1]]);
      } else if(tiroatual[0]-1 >= 0 && gradeJogador[tiroatual[0]-1][tiroatual[1]] == 3){
        seguidos = true;
        provaveislugares = []
        provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]-2, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]+2, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]+3, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]-3, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]-4, tiroatual[1]]);
      } else if(tiroatual[1]+1 < 20 && gradeJogador[tiroatual[0]][tiroatual[1]+1] == 3){
        seguidos = true;
        provaveislugares = []
        provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+2]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-2]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-3]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+3]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+4]);
      } else if(tiroatual[1]-1 >= 0 && gradeJogador[tiroatual[0]][tiroatual[1]-1] == 3){
        seguidos = true;
        provaveislugares = []
        provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-2]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+2]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+3]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-3]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-4]);
      } else if(tiroatual[0]-1 < 0 && tiroatual[0]+1 < 20 && tiroatual[1]+1 < 20 && tiroatual[1]-1 > 0){
        seguidos = false;
        provaveislugares = []
        provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
      } else if(tiroatual[0]+1 > 19 && tiroatual[0]-1 > 0 && tiroatual[1]+1 < 20 && tiroatual[1]-1 > 0){
        seguidos = false;
        provaveislugares = []
        provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
      }else if(tiroatual[1]-1 < 0 && tiroatual[0]+1 < 20 && tiroatual[0]-1 > 0 && tiroatual[1]+1 < 20){
        seguidos = false;
        provaveislugares = []
        provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
      }else if(tiroatual[1]+1 > 19 && tiroatual[0]+1 < 20 && tiroatual[0]-1 && tiroatual[1]-1 > 0){
        seguidos = false;
        provaveislugares = []
        provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
      } else {
        seguidos = false;
        provaveislugares = []
        provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
        provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
        provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
      }
          // muda a grade do jogador para 3 indicando que havia uma embarcação e o tiro foi dado
        gradeJogador[tiroatual[0]][tiroatual[1]] = 3
        placarcomputador += 1;
      }
      provaveislugares = provaveislugares.filter(elemento => !locais.includes(elemento));
    }

