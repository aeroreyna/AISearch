AISearch = {PopSize:5, NoIter:10, NoDim : 1};

AISearch.InicializaPoblacion = function(){
  pob = []
  for (i=0;i<AISearch.PopSize;i++){
    pob.push(Math.random()*14)
  }
  AISearch.Pob = pob
}

AISearch.EvaluaDesempeno = function(){
  fit = []
  for (i=0;i<AISearch.PopSize;i++){
    fit.push(AISearch.Fitness(AISearch.Pob[i]))
  }
  AISearch.FitPob = fit
}

AISearch.Start = function(){
  for (i=0; i<AISearch.NoIter; i++){
    
  }
}

AISearch.Fitness = function(x){
  st = $("#MathFunc")[0].value
  return eval(st)
}

AISearch.plot=function(divTag, all){
  d1 = []
  for (i=0;i<AISearch.PopSize;i++){
    d1.push([AISearch.Pob[i], AISearch.FitPob[i]])
  }
  $.plot(divTag, [ {data:all},{data:d1, points: { show: true } }]);
}
