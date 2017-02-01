AISearch.evalPopulation = function(population){
  var local = population ? true : false;
  population = population || this.population;
  var fit = zeros(population.length,1);
  for(var i=0;i<population.length;i++){
    fit[i]=this.fitnessFunction(population[i].slice());
  }
  if(local == false) this.fitness = fit;
  return fit;
};

AISearch.updateBest = function(){
  var index = argmin(this.fitness);
  if(this.fitness[index]<this.bestFitness){
    this.bestSolution = this.population[index];
    this.bestFitness = this.fitness[index];
  }
};
