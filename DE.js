AISearch.DECrossover = 0.5;
AISearch.DEF = 1;

AISearch.DEOperadores = function(AI){
  for (i=0;i<this.PopSize;i++){
    act  = this.Pob[i];
    ind1 = this.Pob[this.EscogeIndividuo([i])]
    ind2 = this.Pob[this.EscogeIndividuo([i, ind1])]
    ind3 = this.Pob[this.EscogeIndividuo([i, ind1, ind2])]

    R = Math.Floor(Math.random * this.NoDim)
    for (j=0;j<this.NoDim;j++){
      if (R==j | Math.random < this.DECrossover){
        //aqui se tiene que corregir para que cada ind sea un arreglo
        newP = ind1 + F * (ind2-ind3);
        newP = newP < 0 ? 0 : newP
        newP = newP > 1 ? 1 : newP
      }
    }
  }
}

AISearch.EscogeIndividuo = function(i){
  while(1){
    x = Math.floor(Math.random()*this.PopSize)
    c = 0
    for (j=0; j<i.length;j++){
      c = c | i[j] == x
    }
    if (c==0) return x
  }
}
