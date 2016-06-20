AISearch = {
  PopSize:5,
  NoIter:10,
  NoDim : 1,
  InicializaPoblacion : function(){
    pob = []
    for (i=0;i<this.PopSize;i++){
      pob.push(Math.random()*14)
    }
    this.Pob = pob
  },
  EvaluaDesempeno : function(){
    fit = []
    for (i=0;i<this.PopSize;i++){
      fit.push(this.Fitness(this.Pob[i]))
    }
    this.FitPob = fit
  },
  Start : function(){
    for (i=0; i<this.NoIter; i++){

    }
  },
  Fitness : function(x){
    st = $("#MathFunc")[0].value
    return eval(st)
  },
  plot : function(divTag, all){
    d1 = []
    for (i=0;i<this.PopSize;i++){
      d1.push([this.Pob[i], this.FitPob[i]])
    }
    $.plot(divTag, [ {data:all},{data:d1, points: { show: true } }]);
  }
}
