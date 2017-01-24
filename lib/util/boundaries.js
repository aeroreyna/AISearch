AISearch.checkBounds = function(population){
  var local = population ? true : false;
  population = population || this.population;
  for(var i=0;i<population.length;i++){
    for(var j=0;j<this.noDimensions;j++){
      population[i][j]= population[i][j]>1 ? 1 : population[i][j];
      population[i][j]= population[i][j]<0 ? 0 : population[i][j];
    }
  }
  if(local == false) this.population = population;
  return population;
};
