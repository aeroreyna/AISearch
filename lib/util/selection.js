AISearch.selectNDifferentSolutions =  function(sizePopulation, N){
  var temp = randperm(sizePopulation);
  var resp = [];
  for(var i=0;i<N;i++){
    resp.push(temp[i]);
  }
  return resp;
};
