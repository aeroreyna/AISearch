AISearch = {
  PopSize:7,
  NoIter:10,
  NoDim : 1,
  ActIte: 10,
  plotID: "",
  plotFunc: [],
  bestHistoric : [],
  Operadores : function(){},
  InicializaPoblacion : function(){
    pob = [];
    for (i=0;i<this.PopSize;i++){
      pob.push(Math.random());
    }
    this.Pob = pob;
  },
  InicializaPoblacionBin(){
    pob = [];
    for (i=0;i<this.PopSize;i++){
      ind = []
      for (j=0;j<this.NoDim;j++){
        ind.push(Math.floor(Math.random()*2))
      }
      pob.push(ind);
    }
    this.Pob = pob;
  },
  EvaluaDesempeno : function(){
    fit = [];
    //for (i=0;i<this.PopSize;i++){
    //  fit.push(this.Fitness(this.Pob[i]));
    //}
    this.Pob.forEach(function(entry){
      fit.push(this.Fitness(entry));
    },this)
    this.FitPob = fit;
  },
  EvaluaDesempenoInd : function(ind){
    return this.Fitness(ind*14);
  },
  Start : function(){
    for (k=0; k<this.NoIter; k++){
      this.Operadores();
      this.plot();
    }
  },
  Fitness : function(x){
    st = $("#MathFunc")[0].value;
    return eval(st);
  },
  sort : function(){
    newPob = [];
    newFit = [];
    indexs = sortArg(this.FitPob);
    for (i=0;i<this.PopSize;i++){
      newPob.push(this.Pob[indexs[i]]);
      newFit.push(this.FitPob[indexs[i]]);
    }
    this.Pob = newPob;
    this.FitPob = newFit;
  },
  plot : function(all){
    all = all == undefined ? this.FitFunc : all;
    d1 = [];
    for (i=0;i<this.PopSize;i++){
      d1.push([this.Pob[i]*14, this.FitPob[i]]);
    }
    $.plot(this.plotID, [ {data:all},{data:d1, points: { show: true } }]);
  }
}

function sortArg(A){
  No = A.length;
  indexs = [];
  for(i=0;i<No;i++){
    newInd = 0;
    minVal = Infinity;
    for(k=0;k<No;k++){
      if(isInIt(indexs,k)==false){
        if (A[k]<minVal){
          minVal = A[k];
          newInd = k;
        }
      }
    }
    indexs.push(newInd)
  }
  return indexs;
}
function isInIt(A, val){
  for(j=0;j<A.length;j++){
    if(A[j] == val ) return true;
  }
  return false;
}
