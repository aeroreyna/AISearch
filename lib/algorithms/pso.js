AISearch.initilicePSO = function(){
  this.bestPersonal = this.population.slice();
  this.bestPersonalF = this.fitness.slice();
  this.velocity = zeros(this.sizePopulation, this.noDimensions);
};
AISearch.operatorsPSO = function(){
  var bestPersonalParam = 0.3;
  var bestParam = 0.4;
  var velocityParam = 0.9;

  // PSO Memory (velocity and personal best positions)
  if(this.bestPersonal == undefined || this.velocity == undefined) this.initilicePSO();
  if(this.bestPersonal.length != this.sizePopulation || this.velocity.length != this.sizePopulation) this.initilicePSO();
  //console.table(this.population);
  //implementation
  for(var i=0;i<this.sizePopulation;i++){
    for(var j=0;j<this.noDimensions;j++){
      var pbAtraction = Math.random() * (this.population[i][j] - this.bestPersonal[i][j]);
      var bestAtraction = Math.random() * (this.bestSolution[j] - this.bestPersonal[i][j]);
      this.velocity[i][j] = velocityParam * this.velocity[i][j] +
                     bestPersonalParam * pbAtraction + bestParam * bestAtraction;
      this.bestPersonal[i][j] = this.bestPersonal[i][j] + this.velocity[i][j];
    }
  }
  this.bestPersonal = this.checkBounds(this.bestPersonal);
  // eval fitness
  this.bestPersonalF = this.evalPopulation(this.bestPersonal);
  // Update best personal positions
  for(var i=0;i<this.sizePopulation;i++){
    if(this.fitness[i]>this.bestPersonalF[i]){
      this.fitness[i] = this.bestPersonalF[i] + 0;
      this.population[i] = this.bestPersonal[i].slice();
    }
  }
};
