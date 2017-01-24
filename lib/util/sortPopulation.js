AISearch.sortPopulation = function(){
  var newPob = [];
  var newFit = [];
  var indexs = sortArg(this.fitness);
  for (var i=0;i<this.sizePopulation;i++){
    newPob.push(this.population[indexs[i]]);
    newFit.push(this.fitness[indexs[i]]);
  }
  this.population = newPob;
  this.fitness = newFit;
};
