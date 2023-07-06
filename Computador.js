let somaEmbarcacoes = 0;
let rodar = false;
let erro = false;
let vetorPosicoes = [];
let direcoes = ["cima", "baixo", "direita", "esquerda"]
let direcaoComputador;
let posicoesComputador = [];
let somaComputador = 0;
let parar = false;
let gradeComputador = [];
let gradePoscomputador = [];
let tiroatual;
let tiroanterior;
let provaveislugares;
let tirosdados = [];
let locais = [];
  let seguidos = false;

function vetorPosicoesf(){
  for (let i = 0; i < 20; i++) {
    vetorPosicoes[i] = i
  }
  return vetorPosicoes;
}

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
  }
}

// let somaEmbarcacoes = 0;
// let rodar = false;
// let erro = false;
// let vetorPosicoes = [];
// let direcoes = ["cima", "baixo", "direita", "esquerda"]
// let direcaoComputador;
// let posicoesComputador = [];
// let somaComputador = 0;
// let parar = false;
// let gradeComputador = [];
// let gradePoscomputador = [];
// let tiroatual;
// let tiroanterior;
// let provaveislugares;
// let tirosdados = [];
// let locais = [];
//   let seguidos = false;

// function vetorPosicoesf(){
//   for (let i = 0; i < 20; i++) {
//     vetorPosicoes[i] = i
//   }
//   return vetorPosicoes;
// }

// function iniciarComputador(){
//   for (let i = 0; i < 20; i++) {
//     gradeComputador[i] = [];
//     gradePoscomputador[i] = [];
//     for (let j = 0; j < 20; j++) {
//       gradeComputador[i][j] = matrix[i][j];
//       locais.push([i, j])
//       gradePoscomputador[i][j] = [i * 20 + 425 , j * 20];
//       somaComputador += gradeComputador[i][j];

//     }
//   }
//   provaveislugares = [random(locais)];
// }

// const matrix = Array.from(Array(20), () => Array(20).fill(0));

// function isPositionAvailable(x, y, length, direction) {
//   if (direction === 'horizontal') {
//     for (let i = y; i < y + length; i++) {
//       if (matrix[x][i] !== 0) {
//         return false;
//       }
//     }
//   } else if (direction === 'vertical') {
//     for (let i = x; i < x + length; i++) {
//       if (matrix[i][y] !== 0) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

// function markLine(x, y, length, direction) {
//   if (direction === 'horizontal') {
//     for (let i = y; i < y + length; i++) {
//       matrix[x][i] = 1;
//     }
//   } else if (direction === 'vertical') {
//     for (let i = x; i < x + length; i++) {
//       matrix[i][y] = 1;
//     }
//   }
// }

// function getRandomDirection() {
//   return Math.random() < 0.5 ? 'horizontal' : 'vertical';
// }

// function getRandomPosition(length, direction) {
//   let x, y;
//   if (direction === 'horizontal') {
//     x = Math.floor(Math.random() * 20);
//     y = Math.floor(Math.random() * (21 - length));
//   } else if (direction === 'vertical') {
//     x = Math.floor(Math.random() * (21 - length));
//     y = Math.floor(Math.random() * 20);
//   }
//   return { x, y };
// }

// const lineLengths = [5, 4, 3, 2, 1];

// for (let length of lineLengths) {
//   let direction = getRandomDirection();
//   let position = getRandomPosition(length, direction);

//   while (!isPositionAvailable(position.x, position.y, length, direction)) {
//     direction = getRandomDirection();
//     position = getRandomPosition(length, direction);
//   }

//   markLine(position.x, position.y, length, direction);
// }

// function inteligencia(){
//   // boleano garantido que o tiro seja feito
//   let tirodado = false
//     // a inteligência só funciona quando o play for apertado
//   if(!escolher){
//     // enquanto um tiro não for escolhido ele não para de rodar
//     while(!tirodado){
//     // caso o vetor de provavies lugares fique vazio é adicionad um valor randomico das posições possíveis 
//     if(provaveislugares == 0){
//         provaveislugares = [random(locais)]
//     }
//     // inicia um tiro alterior
//     tiroanterior = [0, 0];
//     // inicia o tiro atual com base no vetor de provaveis lugares
//     tiroatual = provaveislugares[0];
//     // remove de provaveis lugares o tiro atual
//     provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual); 

//     // inicia a verificação
//     // caso o tiro atual seja igual a zero
//     if(gradeJogador[tiroatual[0]][tiroatual[1]] == 0){
//       if(tiroatual[0]+1 < 20 && tiroatual[0]-1 >= 0 && tiroatual[1]+1 < 20 && tiroatual[1]+1 >= 0 && seguidos){
//         seguidos = false;
//         if(gradeJogador[tiroatual[0]+1][tiroatual[1]] != 3 && gradeJogador[tiroatual[0]-1][tiroatual[1]] != 3 && gradeJogador[tiroatual[0]][tiroatual[1]+1] != 3 && gradeJogador[tiroatual[0]][tiroatual[1]-1] != 3){
//           provaveislugares = []
//         } else if(gradeJogador[tiroatual[0]+1][tiroatual[1]] == 3){
//           provaveislugares = []
//           provaveislugares.push([tiroatual[0]+2, tiroatual[1]]);
//           provaveislugares.push([tiroatual[0]+3, tiroatual[1]]);
//           provaveislugares.push([tiroatual[0]+4, tiroatual[1]]);
//  provaveislugares.push([tiroatual[0]+5, tiroatual[1]]);
//         } else if(gradeJogador[tiroatual[0]-1][tiroatual[1]] == 3){
//           provaveislugares = []
//           provaveislugares.push([tiroatual[0]-2, tiroatual[1]]);
//           provaveislugares.push([tiroatual[0]-3, tiroatual[1]]);
//           provaveislugares.push([tiroatual[0]-4, tiroatual[1]]);
//  provaveislugares.push([tiroatual[0]-5, tiroatual[1]]);
//         } else if(gradeJogador[tiroatual[0]][tiroatual[1]+1] == 3){
//           provaveislugares = []
//           provaveislugares.push([tiroatual[0], tiroatual[1]+2]);
//           provaveislugares.push([tiroatual[0], tiroatual[1]+3]);
//           provaveislugares.push([tiroatual[0], tiroatual[1]+4]);
//  provaveislugares.push([tiroatual[0], tiroatual[1]+5]);
//         } else if(gradeJogador[tiroatual[0]][tiroatual[1]-1] == 3){
//           provaveislugares = []
//           provaveislugares.push([tiroatual[0], tiroatual[1]-2]);
//           provaveislugares.push([tiroatual[0], tiroatual[1]-3]);
//           provaveislugares.push([tiroatual[0], tiroatual[1]-4]);
//           provaveislugares.push([tiroatual[0], tiroatual[1]-5]);
//         }
//       }

//       // O tirodado é alterado para verdadeiro o que grante a quebra do loop
//       tirodado = true;
//       // remove do array de todas as possibilidades o tiro atual
//       locais = locais.filter(elemento => elemento !== tiroatual);
//       // muda na grade do jogador o valor para 4 indicando que não há navio e o tiro foi dado
//       gradeJogador[tiroatual[0]][tiroatual[1]] = 4
      
//       //verifica se o tiro atual acertou uma embarcação
//     } else if(gradeJogador[tiroatual[0]][tiroatual[1]] == 1){
//       // O tirodado é alterado para verdadeiro o que grante a quebra do loop
//       tirodado = true;

//       if(gradeJogador[tiroatual[0]+1][tiroatual[1]] == 3){
//         seguidos = true;
//         provaveislugares = []
//         provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]+2, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]-2, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]-3, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]+3, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]+4, tiroatual[1]]);
//       } else if(gradeJogador[tiroatual[0]-1][tiroatual[1]] == 3){
//         seguidos = true;
//         provaveislugares = []
//         provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]-2, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]+2, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]+3, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]-3, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]-4, tiroatual[1]]);
//       } else if(gradeJogador[tiroatual[0]][tiroatual[1]+1] == 3){
//         seguidos = true;
//         provaveislugares = []
//         provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]+2]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]-2]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]-3]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]+3]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]+4]);
//       } else if(gradeJogador[tiroatual[0]][tiroatual[1]-1] == 3){
//         seguidos = true;
//         provaveislugares = []
//         provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]-2]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]+2]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]+3]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]-3]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]-4]);
//       } else {
//         seguidos = false;
//         provaveislugares = []
//         provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
//         provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
//       }
//           // muda a grade do jogador para 3 indicando que havia uma embarcação e o tiro foi dado
//         gradeJogador[tiroatual[0]][tiroatual[1]] = 3
//         placarcomputador += 1;
//       }
//       provaveislugares = provaveislugares.filter(elemento => !locais.includes(elemento));
//     }
//   }
// }


// // funcional
// // function inteligencia(){
// //   // boleano garantido que o tiro seja feito
// //   let tirodado = false
// //     // a inteligência só funciona quando o play for apertado
// //   if(!escolher){
// //     // enquanto um tiro não fro escolhido ele não para de rodar
// //     while(!tirodado){
// //     // caso o vetor de provavies lugares fique vazio é adicionad um valor randomico das posições possíveis 
// //     if(provaveislugares == 0){
// //         provaveislugares = [random(locais)]
// //     }
// //     // inicia um tiro alterior
// //     tiroanterior = [0, 0];
// //     // inicia o tiro atual com base no vetor de provaveis lugares
// //     tiroatual = provaveislugares[0];
// //     // remove de provaveis lugares o tiro atual
// //     provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual); 

// //     // inicia a verificação
// //     // caso o tiro atual seja igual a zero
// //     if(gradeJogador[tiroatual[0]][tiroatual[1]] == 0){
// //       // O tirodado é alterado para verdadeiro o que grante a quebra do loop
// //       tirodado = true;
// //       // remove do array de todas as possibilidades o tiro atual
// //       locais = locais.filter(elemento => elemento !== tiroatual);
// //       // muda na grade do jogador o valor para 4 indicando que não há navio e o tiro foi dado
// //       gradeJogador[tiroatual[0]][tiroatual[1]] = 4
      
// //       //verifica se o tiro atual acertou uma embarcação
// //     } else if(gradeJogador[tiroatual[0]][tiroatual[1]] == 1){
// //       // O tirodado é alterado para verdadeiro o que grante a quebra do loop
// //       tirodado = true;

// //       if(gradeJogador[tiroatual[0]+1][tiroatual[1]] == 3){
// //         provaveislugares = []
// //         provaveislugares.push([tiroatual[0]-3, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]-2, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]+2, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]+3, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]+4, tiroatual[1]]);
// //       } else if(gradeJogador[tiroatual[0]-1][tiroatual[1]] == 3){
// //         provaveislugares = []
// //         provaveislugares.push([tiroatual[0]+3, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]+2, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]-2, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]-3, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]-4, tiroatual[1]]);
// //       } else if(gradeJogador[tiroatual[0]][tiroatual[1]+1] == 3){
// //         provaveislugares = []
// //         provaveislugares.push([tiroatual[0], tiroatual[1]-3]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]-2]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]+2]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]+3]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]+4]);
// //       } else if(gradeJogador[tiroatual[0]+1][tiroatual[1]-1] == 3){
// //         provaveislugares = []
// //         provaveislugares.push([tiroatual[0], tiroatual[1]+3]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]+2]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]-2]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]-3]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]-4]);
// //       } else {
// //         provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //         provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //       }

// //         // if(gradeJogador[tiroanterior[0]][tiroanterior[1]] == 3 && tiroanterior[1] != tiroatual[1]){
// //         //   if(tiroatual[0]+1 < 20 && tiroatual[0]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]+1, tiroatual[1]])){
// //         //     provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //         //       }
// //         //   if(tiroatual[0]-1 >= 0 && tiroatual[0]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]-1, tiroatual[1]])){
// //         //     provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //         //       }
// //         // } else if(gradeJogador[tiroanterior[0]][tiroanterior[1]] == 3 && tiroanterior[1] != tiroatual[1]){
// //         //   if(tiroatual[1]+1 < 20 && tiroatual[1]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]+1])){
// //         //     provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //         //   }
// //         //   if(tiroatual[1]-1 >= 0 && tiroatual[1]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]-1])){
// //         //     provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //         //   }
// //         // } else {
// //         //     if(tiroatual[0]+1 < 20 && tiroatual[0]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]+1, tiroatual[1]])){
// //         //       provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //         //     }
// //         //     if(tiroatual[0]-1 >= 0 && tiroatual[0]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]-1, tiroatual[1]])){
// //         //       provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //         //     }
// //         //     if(tiroatual[1]+1 < 20 && tiroatual[1]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]+1])){
// //         //       provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //         //     }
// //         //     if(tiroatual[1]-1 >= 0 && tiroatual[1]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]-1])){
// //         //       provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //         //     }

// //           // muda a grade do jogador para 3 indicando que havia uma embarcação e o tiro foi dado
// //         gradeJogador[tiroatual[0]][tiroatual[1]] = 3
// //       }
// //       provaveislugares = provaveislugares.filter(elemento => !locais.includes(elemento));
// //     }
// //   }
// // }

// // function inteligencia(){
// //   // boleano garantido que o tiro seja feito
// //   let tirodado = false
// //     // a inteligência só funciona quando o play for apertado
// //   if(!escolher){
// //     // enquanto um tiro não fro escolhido ele não para de rodar
// //     while(!tirodado){
// //     // caso o vetor de provavies lugares fique vazio é adicionad um valor randomico das posições possíveis 
// //     if(provaveislugares == 0){
// //         provaveislugares = [random(locais)]
// //     }
// //     // inicia um tiro alterior
// //     tiroanterior = [0, 0];
// //     // inicia o tiro atual com base no vetor de provaveis lugares
// //     tiroatual = random(provaveislugares);
// //     // remove de provaveis lugares o tiro atual
// //     provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual); 

// //     // inicia a verificação
// //     // caso o tiro atual seja igual a zero
// //     if(gradeJogador[tiroatual[0]][tiroatual[1]] == 0){
// //       // O tirodado é alterado para verdadeiro o que grante a quebra do loop
// //       tirodado = true;
// //       // remove do array de todas as possibilidades o tiro atual
// //       locais = locais.filter(elemento => elemento !== tiroatual);
// //       // muda na grade do jogador o valor para 4 indicando que não há navio e o tiro foi dado
// //       gradeJogador[tiroatual[0]][tiroatual[1]] = 4
      
// //       //verifica se o tiro atual acertou uma embarcação
// //     } else if(gradeJogador[tiroatual[0]][tiroatual[1]] == 1){
// //       // O tirodado é alterado para verdadeiro o que grante a quebra do loop
// //       tirodado = true;

// //         if(gradeJogador[tiroanterior[0]][tiroanterior[1]] == 3 && tiroanterior[1] != tiroatual[1]){
// //           if(tiroatual[0]+1 < 20 && tiroatual[0]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]+1, tiroatual[1]])){
// //             provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //               }
// //           if(tiroatual[0]-1 >= 0 && tiroatual[0]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]-1, tiroatual[1]])){
// //             provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //               }
// //         } else if(gradeJogador[tiroanterior[0]][tiroanterior[1]] == 3 && tiroanterior[1] != tiroatual[1]){
// //           if(tiroatual[1]+1 < 20 && tiroatual[1]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]+1])){
// //             provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //           }
// //           if(tiroatual[1]-1 >= 0 && tiroatual[1]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]-1])){
// //             provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //           }
// //         } else {
// //             if(tiroatual[0]+1 < 20 && tiroatual[0]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]+1, tiroatual[1]])){
// //               provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //             }
// //             if(tiroatual[0]-1 >= 0 && tiroatual[0]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]-1, tiroatual[1]])){
// //               provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //             }
// //             if(tiroatual[1]+1 < 20 && tiroatual[1]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]+1])){
// //               provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //             }
// //             if(tiroatual[1]-1 >= 0 && tiroatual[1]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]-1])){
// //               provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //             }

// //           // print(provaveislugares)

// //           // muda a grade do jogador para 3 indicando que havia uma embarcação e o tiro foi dado
// //           gradeJogador[tiroatual[0]][tiroatual[1]] = 3
// //       }
// //   }
// //   provaveislugares = provaveislugares.filter(elemento => !locais.includes(elemento));
// //     }
// //   }
// // }

// // function inteligencia(){
// //   let tirodado = false
// //   if(!escolher){
// //     while(!tirodado){
// //     if(provaveislugares == 0){
// //         provaveislugares = [random(locais)]
// //     }
// //     tiroanterior = [0, 0];
// //     tiroatual = random(provaveislugares);
// //     provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual); 
// //     if(gradeJogador[tiroatual[0]][tiroatual[1]] == 0){
// //       provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual);
// //       tirodado = true;
// //       locais = locais.filter(elemento => elemento !== tiroatual);
// //       gradeJogador[tiroatual[0]][tiroatual[1]] = 4
      
// //     } else if(gradeJogador[tiroatual[0]][tiroatual[1]] == 1){
// //       tirodado = true;
// //         if(gradeJogador[tiroanterior[0]][tiroanterior[1]] == 3 && tiroanterior[1] != tiroatual[1]){
// //           if(tiroatual[0]+1 < 20 && tiroatual[0]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]+1, tiroatual[1]])){
// //             provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //               }
// //           if(tiroatual[0]-1 >= 0 && tiroatual[0]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]-1, tiroatual[1]])){
// //             provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //               }
// //         } else if(gradeJogador[tiroanterior[0]][tiroanterior[1]] == 3 && tiroanterior[1] != tiroatual[1]){
// //           if(tiroatual[1]+1 < 20 && tiroatual[1]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]+1])){
// //             provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //           }
// //           if(tiroatual[1]-1 >= 0 && tiroatual[1]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]-1])){
// //             provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //           }
// //         } else {
// //             if(tiroatual[0]+1 < 20 && tiroatual[0]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]+1, tiroatual[1]])){
// //               provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //             }
// //             if(tiroatual[0]-1 >= 0 && tiroatual[0]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0]-1, tiroatual[1]])){
// //               provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //             }
// //             if(tiroatual[1]+1 < 20 && tiroatual[1]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]+1])){
// //               provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //             }
// //             if(tiroatual[1]-1 >= 0 && tiroatual[1]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes([tiroatual[0], tiroatual[1]-1])){
// //               provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //             }

// //           // print(provaveislugares)

          
// //           gradeJogador[tiroatual[0]][tiroatual[1]] = 3
// //       }
// //   }
// //       locais = locais.filter(elemento => elemento !== tiroatual);
// //   provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual); 
// //   provaveislugares = provaveislugares.filter(elemento => !locais.includes(elemento));
// //     }
// //   }
// // }



// // function inteligencia(){
// //   if(!escolher){
// //     if(provaveislugares == 0){
// //         provaveislugares = [random(locais)]
// //     }
// //     tiroanterior = [0, 0];
// //     tiroatual = random(provaveislugares);
// //     provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual); 
// //     if(gradeJogador[tiroatual[0]][tiroatual[1]] == 0){
// //       provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual);
// //       locais = locais.filter(elemento => elemento !== tiroatual);
// //       gradeJogador[tiroatual[0]][tiroatual[1]] = 4
      
// //     } else if(gradeJogador[tiroatual[0]][tiroatual[1]] == 1){
// //         if(gradeJogador[tiroanterior[0]][tiroanterior[1]] == 3 && tiroanterior[1] != tiroatual[1]){
// //           if(tiroatual[0]+1 < 20 && tiroatual[0]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes(tiroatual[0]+1)){
// //             provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //               }
// //           if(tiroatual[0]-1 >= 0 && tiroatual[0]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes(tiroatual[0]-1)){
// //             provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //               }
// //         } else if(gradeJogador[tiroanterior[0]][tiroanterior[1]] == 3 && tiroanterior[1] != tiroatual[1]){
// //           if(tiroatual[1]+1 < 20 && tiroatual[1]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes(tiroatual[1]+1)){
// //             provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //           }
// //           if(tiroatual[1]-1 >= 0 && tiroatual[1]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes(tiroatual[1]-1)){
// //             provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //           }
// //         } else {
// //             if(tiroatual[0]+1 < 20 && tiroatual[0]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes(tiroatual[0]+1)){
// //               provaveislugares.push([tiroatual[0]+1, tiroatual[1]]);
// //             }
// //             if(tiroatual[0]-1 >= 0 && tiroatual[0]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes(tiroatual[0]-1)){
// //               provaveislugares.push([tiroatual[0]-1, tiroatual[1]]);
// //             }
// //             if(tiroatual[1]+1 < 20 && tiroatual[1]+1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes(tiroatual[1]+1)){
// //               provaveislugares.push([tiroatual[0], tiroatual[1]+1]);
// //             }
// //             if(tiroatual[1]-1 >= 0 && tiroatual[1]-1 != 4 && tiroatual[0]+1 != 3 && !provaveislugares.includes(tiroatual[1]-1)){
// //               provaveislugares.push([tiroatual[0], tiroatual[1]-1]);
// //             }

// //           // print(provaveislugares)

          
// //           gradeJogador[tiroatual[0]][tiroatual[1]] = 3
// //       }
// //   }
// //       locais = locais.filter(elemento => elemento !== tiroatual);
// //   provaveislugares = provaveislugares.filter(elemento => elemento !== tiroatual); 
// //   provaveislugares = provaveislugares.filter(elemento => !locais.includes(elemento));
// //   print(provaveislugares)
// //   print(tiroatual)
// //   }

// // }

// // function inteligencia() {
// //   const gradeIA = gradeJogador
// //   const barcos = [ [0,0,0,0,0],
// //                    [0,0,0,0],
// //                    [0,0,0],
// //                    [0,0],
// //                    [0] ];

// //   const possiveisPosicoes = [];

// //   // Inicialmente, seleciona posições aleatórias
// //   for (let i = 0; i < 20; i++) {
// //     for (let j = 0; j < 20; j++) {
// //       possiveisPosicoes.push([i, j]);
// //     }
// //   }

// //   const selecionarPosicao = () => {
// //     return possiveisPosicoes[Math.floor(Math.random() * possiveisPosicoes.length)];
// //   };

// //   const removerPosicao = (posicao) => {
// //     possiveisPosicoes.splice(possiveisPosicoes.indexOf(posicao), 1);
// //   };

// //   const acertarBarco = (linha, coluna) => {
// //     gradeIA[linha][coluna] = 2; // Marca como acerto
// //     // Verifica se o barco afundou
// //     const barco = barcos.find((b) => b.length > 0 && b[0][0] === linha && b[0][1] === coluna);
// //     if (barco) {
// //       barco.shift(); // Remove a posição do barco afundado
// //       if (barco.length === 0) {
// //         console.log('IA afundou um barco!');
// //       }
// //     }
// //   };

// //   const jogadaIA = () => {
// //     if (possiveisPosicoes.length === 0) {
// //       console.log('IA não tem mais posições para jogar!');
// //       return;
// //     }

// //     const [linha, coluna] = selecionarPosicao();
// //     if (gradeIA[linha][coluna] === 0) {
// //       console.log(`IA selecionou posição [${linha}, ${coluna}]`);
// //       if (barcos.some((barco) => barco.some((posicao) => posicao[0] === linha && posicao[1] === coluna))) {
// //         acertarBarco(linha, coluna);
// //       } else {
// //         gradeIA[linha][coluna] = 3; // Marca como água
// //       }
// //       removerPosicao([linha, coluna]);
// //     }

// //     // Realiza a próxima jogada da IA
// //     jogadaIA();
// //   };

// //   jogadaIA();
// // }

// // inteligencia();



