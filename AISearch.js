AISearch = {
  PopSize:7,
  NoIter:10,
  NoDim : 1,
  ActIte: 10,
  plotID: "",
  plotFunc: [],
  Operadores : function(){},
  InicializaPoblacion : function(){
    pob = []
    for (i=0;i<this.PopSize;i++){
      pob.push(Math.random())
    }
    this.Pob = pob
  },
  EvaluaDesempeno : function(){
    fit = []
    for (i=0;i<this.PopSize;i++){
      fit.push(this.Fitness(this.Pob[i]*14))
    }
    this.FitPob = fit
  },
  EvaluaDesempenoInd : function(ind){
    return this.Fitness(ind*14)
  },
  Start : function(){
    for (k=0; k<this.NoIter; k++){
      this.Operadores()
      this.plot()
    }
  },
  Fitness : function(x){
    st = $("#MathFunc")[0].value
    return eval(st)
  },
  plot : function(all){
    all = all == undefined ? this.FitFunc : all
    d1 = []
    for (i=0;i<this.PopSize;i++){
      d1.push([this.Pob[i]*14, this.FitPob[i]])
    }
    $.plot(this.plotID, [ {data:all},{data:d1, points: { show: true } }]);
  }
}
