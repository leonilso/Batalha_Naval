function setup() {
  vetorPosicoesf()
  iniciarComputador();
  transparente = color(0,0,0,0);
  createCanvas(825, 600);
  iniciarJogador();
  
}

function draw() {
  background(220);
  oceano();
  embarcacoes();
  pintar(gradeJogador, gradePosjogador);
  pintarComputador(gradeComputador, gradePoscomputador);
  limpar()
}
