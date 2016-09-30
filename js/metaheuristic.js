metaheuristic = function(fitnessFunction, noDimensions){
  this.fitnessFunction=fitnessFunction;
  this.noDimensions=noDimensions;
}
metaheuristic.prototype ={
  metaheuristic,
  sizePopulation : 30,
  population : [],
  fitness : [],
  bestFitness : Infinity,
  bestSolution : [],
  numberOfFunctionCalls : 0,
  maxNoIterations : 100,
  actualIteration : 0,
  //Properties for data visualization
  historicBestSolution : [],
  historicBestFitness : [],
  eachIterationFunction : undefined,
  customPlotFunction : undefined,
  plotEachIterationB : true,
  plotPopulationB    : false, //Plot the actual population
  plotBestSolutionB  : false, //Plot the actual best solution
  plotHistoricB      : true,  //Plot the historic record
  operators : undefined,
  //methods
  start: function(){
    if(this.fitnessFunction==undefined) return -1;
    if(this.population.length == 0){
      this.initialPopulation();
      this.evalPopulation();
    }
    if(this.fitness.length == 0) this.evalPopulation();
    this.historicBestSolution = zeros(this.maxNoIterations, this.noDimensions);
    this.historicBestFitness = zeros(this.maxNoIterations,1);
    this.updateBest();

    this.historicBestSolution.forEach(function(currentVal, index){
      this.actualIteration = index;
      this.operators();
      this.updateBest();
      this.historicBestSolution[index] = this.bestSolution;
      this.historicBestFitness[index] = this.bestFitness;

      if(this.plotEachIterationB) this.plot();
      if(this.eachIterationFunction!=undefined) this.eachIterationFunction(obj);
    }, this);
  },
  initialPopulation: function(sizePopulation, noDimensions){
    this.sizePopulation = sizePopulation || this.sizePopulation;
    this.noDimensions = noDimensions || this.noDimensions;
    this.population = rand(this.sizePopulation, this.noDimensions);
  },
  evalPopulation: function(population){
    var local = population ? true : false;
    population = population || this.population;
    var fit = zeros(population.length,1);
    for(var i=0;i<population.length;i++)
      fit[i]=this.fitnessFunction(population[i]);
    if(local == false) this.fitness = fit;
    return fit;
  },
  sortPopulation: function(){
    var newPob = [];
    var newFit = [];
    var indexs = sortArg(this.fitness);
    for (var i=0;i<this.sizePopulation;i++){
      newPob.push(this.population[indexs[i]]);
      newFit.push(this.fitness[indexs[i]]);
    }
    this.population = newPob;
    this.fitness = newFit;
  },
  updateBest: function(){
    var index = argmin(this.fitness);
    if(this.fitness[index]<this.bestFitness){
      this.bestSolution = this.population[index];
      this.bestFitness = this.fitness[index];
    }
  },
  plot:function(){
    if(this.customPlotFunction!=undefined){
      this.customPlotFunction();
    }
  },
  checkBounds:function(population){
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
  },
  operatorsDE:function(){
    var crossoverRate = 0.7;
    var differentialWeight = 0.5;
    //console.table(this.population);
    //implementation
    for(var i=0;i<this.sizePopulation;i++){
      selected = this.selectNDifferentSolutions(this.sizePopulation,5);
      selectedDim = randi(this.noDimensions);
      solutionBase = this.population[selected[0]].slice(); // .slice() make it work
      for(var j=0;j<this.noDimensions;j++){
        if(selectedDim== j || Math.random()>crossoverRate){
          solutionBase[j] = this.bestSolution[j] +
            differentialWeight*(this.population[selected[1]][j]  -
                                this.population[selected[2]][j]) +
            differentialWeight*(this.population[selected[3]][j]  -
                                this.population[selected[4]][j]);
          solutionBase[j] = solutionBase[j]>1 ? 1 : solutionBase[j];
          solutionBase[j] = solutionBase[j]<0 ? 0 : solutionBase[j];
        }
      }
      tempFit = this.evalPopulation(solutionBase);
      if(tempFit[0]<this.fitness[selected[0]]){
        console.log(this.population[selected[0]], this.fitness[selected[0]], solutionBase, tempFit[0]);
        this.fitness[selected[0]] = tempFit[0];
        this.population[selected[0]] = solutionBase;
      }
    }
  },
  selectNDifferentSolutions: function(sizePopulation, N){
    var temp = randperm(sizePopulation);
    var resp = [];
    for(var i=0;i<N;i++){
      resp.push(temp[i]);
    }
    return resp;
  },
  operatorsPSO:function(){
    var bestPersonalParam = 0.3;
    var bestParam = 0.4;
    var velocityParam = 0.9;

    // PSO Memory (velocity and personal best positions)
    if(this.bestPersonal == undefined || this.velocity == undefined) this.initilicePSO()
    if(this.bestPersonal.length != this.sizePopulation || this.velocity.length != this.sizePopulation) this.initilicePSO()

    // Update best personal positions
    for(var i=0;i<this.sizePopulation;i++){
      if(this.fitness[i]<this.bestPersonalF[i]){
        this.bestPersonalF[i] = this.fitness[i] + 0;
        this.bestPersonal[i] = this.population[i].slice();
      }
    }
    //console.table(this.population);
    //implementation
    for(var i=0;i<this.sizePopulation;i++){
      for(var j=0;j<this.noDimensions;j++){
        pbAtraction = Math.random() * (this.bestPersonal[i][j] - this.population[i][j]);
        bestAtraction = Math.random() * (this.bestSolution[j] - this.population[i][j]);
        this.velocity[i][j] = velocityParam * this.velocity[i][j] +
                       bestPersonalParam * pbAtraction + bestParam * bestAtraction;
        this.population[i][j] = this.population[i][j] + this.velocity[i][j];
      }
    }
    this.checkBounds();
    // eval fitness
    this.evalPopulation();
  },
  initilicePSO:function(){
    this.bestPersonal = this.population.slice();
    this.bestPersonalF = this.fitness.slice();
    this.velocity = zeros(this.sizePopulation, this.noDimensions);
  }
}

//Utility Functions
function zeros(long,deep){
  var b = [];
  for(var i=0;i<long;i++){
    var a = new Array(deep);
    a.fill(0);
    b.push(a);
  }
  return b;
}
function rand(long,deep){
  var a = zeros(long,deep);
  for(var i=0;i<long;i++){
    for(var j=0;j<deep;j++){
      a[i][j] = Math.random();
      //console.log(a)
    }
  }
  return a;
}
function sortArg(A){
  var No = A.length;
  var indexs = [];
  var newInd = 0;
  var minVal = Infinity;
  for(var i=0;i<No;i++){
    newInd = 0;
    minVal = Infinity;
    for(var k=0;k<No;k++){
      if(isInIt(indexs,k)==false){
        if (A[k]<minVal){
          minVal = A[k];
          newInd = k;
        }
      }
    }
    indexs.push(newInd)
  }
  return indexs;
}
function argmin(A){
  var No = A.length;
  var indexs = [];
  var newInd = 0;
  var minVal = Infinity;
  for(var k=0;k<No;k++){
    if (A[k]<minVal){
      minVal = A[k];
      newInd = k;
    }
  }
  return newInd;
}
function isInIt(A, val){
  for(var j=0;j<A.length;j++){
    if(A[j] == val ) return true;
  }
  return false;
}
//DE Functions
function randperm(N){
  var perm = [];
  var initialPerm = zeros(N,1);
  for(var i=0;i<N;i++) initialPerm[i]=i;
  for(var i=0;i<N;i++){
    var index = randi(initialPerm.length);
    perm.push(initialPerm.splice(index,1)[0]);
  }
  return perm;
}
function randi(N){
  return Math.floor(Math.random()*N-0.000001);
}
