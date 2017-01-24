AISearch.getBenchmarkList = function(){
  var listBF = [];
  for (temp in this.benchmarkFunctions) {
      listBF.push(temp);
  }
  return listBF;
};
