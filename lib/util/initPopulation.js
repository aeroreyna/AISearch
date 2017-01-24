AISearch.initPopulation = function(sizePopulation, noDimensions){
  this.sizePopulation = sizePopulation || this.sizePopulation;
  this.noDimensions = noDimensions || this.noDimensions;
  this.population = rand(this.sizePopulation, this.noDimensions);
  this.bestFitness = Infinity;
  this.bestSolution = [];
};
