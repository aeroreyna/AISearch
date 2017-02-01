/*
 *  aisearch - v1.0.0
 *  Framework for metaheuristic algorithms
 *  
 *
 *  Made by Adolfo Reyna
 *  Under MIT License
 */
AISearch = {
  sizePopulation : 30,
  population : [],
  fitness : [],
  bestFitness : Infinity,
  bestSolution : [],
  numberOfFunctionCalls : 0,
  maxNoIterations : 100,
  actualIteration : 0,
  fitnessFunction : undefined,
  noDimensions : 2,
  benchmarkFunctions: {},
  selectedBF: undefined,
  operators : undefined,
  //Properties for data visualization
  historicBestSolution : [],
  historicBestFitness : [],
  eachIterationFunction : undefined,
  customPlotFunction : undefined,
  plotEachIterationB : false,
  plotPopulationB    : false, //Plot the actual population
  plotBestSolutionB  : false, //Plot the actual best solution
  plotHistoricB      : true,  //Plot the historic record
  //SpecificLibraries
  plotly: undefined,
  mainPlot: {div: undefined, layout:undefined, data:undefined},
  historicPlot: {div: undefined, layout:undefined, data:undefined},
}
AISearch.start = function(){
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
};
AISearch.about = function(){
  console.log("AISearch v.1.0.0")
};

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

AISearch.getBenchmarkList = function(){
  var listBF = [];
  for (temp in this.benchmarkFunctions) {
      listBF.push(temp);
  }
  return listBF;
};

AISearch.initPopulation = function(sizePopulation, noDimensions){
  this.sizePopulation = sizePopulation || this.sizePopulation;
  this.noDimensions = noDimensions || this.noDimensions;
  this.population = rand(this.sizePopulation, this.noDimensions);
  this.bestFitness = Infinity;
  this.bestSolution = [];
};

function isInIt(A, val){
  for(var j=0;j<A.length;j++){
    if(A[j] == val ) return true;
  }
  return false;
}

AISearch.plot = function(){
  if(this.customPlotFunction!=undefined){
    this.customPlotFunction();
  }
};

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

AISearch.selectBF = function(name){
  this.selectedBF = this.benchmarkFunctions[name];
  if(this.selectedBF){
    this.fitnessFunction = this.selectedBF.eval;
    if(typeof this.selectedBF.lowLimit=="number"){
      this.selectedBF.lowx = this.selectedBF.lowLimit;
      this.selectedBF.highx = this.selectedBF.highLimit;
      this.selectedBF.lowy = this.selectedBF.lowLimit;
      this.selectedBF.highy = this.selectedBF.highLimit;
    }else{
      this.selectedBF.lowx = this.selectedBF.lowLimit[0];
      this.selectedBF.highx = this.selectedBF.highLimit[0];
      this.selectedBF.lowy = this.selectedBFlowLimit[1];
      this.selectedBF.highy = this.selectedBF.highLimit[1];
    }
  }
}

AISearch.selectNDifferentSolutions =  function(sizePopulation, N){
  var temp = randperm(sizePopulation);
  var resp = [];
  for(var i=0;i<N;i++){
    resp.push(temp[i]);
  }
  return resp;
};

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

function zeros(long,deep){
  var b = [];
  for(var i=0;i<long;i++){
    var a = new Array(deep);
    a.fill(0);
    b.push(a);
  }
  return b;
}

AISearch.operatorsDE = function(){
  var crossoverRate = 0.7,
      differentialWeight = 0.5;
  //console.table(this.population);
  //implementation
  for(var i=0;i<this.sizePopulation;i++){
    var selected = this.selectNDifferentSolutions(this.sizePopulation,5);
    var selectedDim = randi(this.noDimensions);
    var solutionBase = this.population[selected[0]].slice(); // .slice() make it work
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
    var tempFit = this.evalPopulation([solutionBase]);
    if(tempFit[0]<this.fitness[selected[0]]){
      this.fitness[selected[0]] = tempFit[0];
      this.population[selected[0]] = solutionBase;
    }
  }
};

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

AISearch.benchmarkFunctions.ackley = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 70 * x[i] - 35;
    }
    var a=20,
        b=0.2,
        c=2*Math.PI,
        tempSum = 0, //sum(x.^2)
        tempSum2 = 0; //sum(cos(x.*c))
    for(i = 0; i<n; i++){
      tempSum += Math.pow(x[i],2);
      tempSum2 += Math.cos(x[i] * c);
    }
    return -a * Math.exp(-b*Math.sqrt(1/n*tempSum)) - Math.exp(1/n*tempSum2) + a + Math.exp(1);
  },
  name: "ackley",
  lowLimit: -35,
  highLimit: 35,
  minimumFitness: 0,
  minimumPosition2D: [0,0],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: true,
  multimodal: true,
  multipleGlobal: false,
}

AISearch.benchmarkFunctions.alpine = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 20 * x[i] - 10;
    }
    var tempSum = 0;
    for(i = 0; i<n; i++){
      tempSum += Math.abs(x[i]*Math.sin(x[i])+0.1*x[i]);
    }
    return tempSum;
  },
  name:"alpine",
  lowLimit: -10,
  highLimit: 10,
  minimumFitness: 0,
  minimumPosition2D: [0,0],
  continuous: true,
  differenciable: false,
  Separable: true,
  scalable: true,
  multimodal: true,
  multipleGlobal: false,
}

AISearch.benchmarkFunctions.alpine2 = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 10 * x[i];
    }
    var tempSum = 1;
    for(i = 0; i<n; i++){
      tempSum *= Math.sqrt(x[i])*Math.sin(x[i]);
    }
    return tempSum;
  },
  name:"alpine",
  lowLimit: 0,
  highLimit: 10,
  minimumFitness: 7.8849,
  minimumPosition2D: [7.917,7.917],
  continuous: true,
  differenciable: true,
  Separable: true,
  scalable: true,
  multimodal: true,
  multipleGlobal: false,
}

AISearch.benchmarkFunctions.bartels = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 1000 * x[i] - 500;
    }
    return Math.abs( Math.pow(x[0],2) + Math.pow(x[1],2) * x[0]*x[1] ) +
           Math.abs(Math.sin(x[0])) + Math.abs(Math.cos(x[1]));
  },
  name:"bartels",
  lowLimit: -500,
  highLimit: 500,
  minimumFitness: 1,
  minimumPosition2D: [0, 0],
  continuous: true,
  differenciable: false,
  Separable: false,
  scalable: false,
  multimodal: true,
  multipleGlobal: false,
}

AISearch.benchmarkFunctions.bartels = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 9 * x[i] - 4.5;
    }
    return Math.pow(1.5   - x[0] + x[0]*x[1], 2) +
           Math.pow(2.25  - x[0] + x[0]*Math.pow(x[1],2),2) +
           Math.pow(2.625 - x[0] + x[0]*Math.pow(x[1],3),2);
  },
  name: "bartels",
  lowLimit: -4.5,
  highLimit: 4.5,
  minimumFitness: 0,
  minimumPosition2D: [3, 0.5],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: false,
  multimodal: false,
  multipleGlobal: false,
}

AISearch.benchmarkFunctions.bird = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 4*Math.PI * x[i] - 2*Math.PI;
    }
    return Math.sin(x[0])*Math.exp(Math.pow(1-Math.cos(x[1]),2)) +
           Math.cos(x[1])*Math.exp(Math.pow(1-Math.sin(x[0]),2)) +
           Math.pow(x[0]-x[1],2);
  },
  name: "bird",
  lowLimit: -2*Math.PI,
  highLimit: 2*Math.PI,
  minimumFitness: -106.764537,
  minimumPosition2D: [[4.70104, 3.15294],[-1.58214, -3.13024]],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: false,
  multimodal: true,
  multipleGlobal: true,
};

AISearch.benchmarkFunctions.booth = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 20 * x[i] - 10;
    }
    return Math.pow(x[0]+2*x[1]-7, 2) + Math.pow(2*x[0]+x[1]-5, 2);
  },
  name: "booth",
  lowLimit: -10,
  highLimit: 10,
  minimumFitness: 0,
  minimumPosition2D: [1,3],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: false,
  multimodal: false,
  multipleGlobal: false,
}

AISearch.benchmarkFunctions.branin = {
  eval: function(x){
    var n = x.length,
        i = 0;
    x[0] = x[0] * 15 - 5;
    x[1] = x[1] * 15;
    return Math.pow( x[1] -5.1*Math.pow(x[0], 2)/(4*Math.pow(Math.PI,2)) +
                     5*x[0]/Math.PI -6 ,2 ) +
           10*(1-1/(8*Math.PI))*Math.cos(x[0]) + 10;
  },
  name:"branin",
  lowLimit: [-5, 0],
  highLimit: [10, 15],
  minimumFitness:  0.3978873,
  minimumPosition2D: [[-Math.PI, 12.275],[Math.PI, 2.275],[3*Math.PI,2.425]],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: false,
  multimodal: true,
  multipleGlobal: true,
}

AISearch.benchmarkFunctions.schwefel = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 1000 * x[i] - 500;
    }
    var tempSum = 0;
    for(i = 0; i<n; i++){
      tempSum += -x[i] * Math.sin(Math.sqrt(Math.abs(x[i])));
    }
    return 418.9829 * n + tempSum;
  },
  name:"schwefel",
  lowLimit: -500,
  highLimit: 500,
  minimumFitness: 0,
  minimumPosition2D: [1,3],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: true,
  multimodal: true,
  multipleGlobal: false,
  }

AISearch.graphData = function(type="surface", resolution=100){
  bounds = this.selectedBF || {highx:1, highy:1, lowx:0, lowy:0};
  if(type=="surface"){
    var x = new Array(resolution),
        y = new Array(resolution),
        z = new Array(resolution),
        i, j;
    for(var i = 0; i < resolution; i++) {
      x[i] = y[i] = i / resolution;
      z[i] = new Array(resolution);
    }
    for(var i = 0; i < resolution; i++) {
      for(j = 0; j < resolution; j++) {
        z[j][i] = this.fitnessFunction([x[i],y[j]]);
      }
    }
    //Adjust Bondaries
    for(var i = 0; i < resolution; i++) {
      x[i] = x[i] * (bounds.highx-bounds.lowx) + bounds.lowx;
      y[i] = y[i] * (bounds.highy-bounds.lowy) + bounds.lowy;
    }
    return {x:x, y:y, z:z};
  }
};

AISearch.plot3D = function(div=undefined, type="surface", resolution=100){
  if(div){
    this.mainPlot.div = div;
  }else{
    if(this.mainPlot.div){
      div = this.mainPlot.div;
    }else{
      console.error("No HTML div was given")
    }
  }
  if(this.noDimensions < 2) console.error("Dimensions dismatch");
  if(this.noDimensions > 2) console.warn("Only 2 dimensions can be plot");
  var t = this.graphData(type, resolution);
  this.mainPlot.data = [ {
    z: t.z,
    x: t.x,
    y: t.y,
    type: type,
    name: "Fitness Function",
    showscale: false,
    opacity:1
  }];
  this.updatePlot();
}

AISearch.plotPopulation = function(){
  popParams = this.mainPlot.popParams;
  bounds = this.selectedBF || {highx:1, highy:1, lowx:0, lowy:0};
  var x = [],
      y = [],
      z = [];
  for(var i=0;i<this.sizePopulation;i++){
    x.push(this.population[i][0] * (bounds.highx-bounds.lowx) + bounds.lowx);
    y.push(this.population[i][1] * (bounds.highy-bounds.lowy) + bounds.lowy);
    z.push(this.fitness[i]);
  }
  var tempData = {
    z: z,
    x: x,
    y: y,
    mode: 'markers',
    type: 'scatter3d',
    name: "Population",
    marker: {
      color: 'rgb(23, 190, 207)',
      size: popParams.sizePoints,
    },
    opacity: popParams.opacity,
    uid:350, //Forced ID
  };
  //Plot Population
  var plotID = this.findPlot("Population");
  if(plotID == -1){
    this.mainPlot.data.push(tempData);
  }else{
    this.mainPlot.data[plotID] = tempData;
  }

  //Plot Best Solution
  if(this.bestFitness!=Infinity){
    var tempData2 = {
      z: [this.bestFitness],
      x: [this.bestSolution[0]* (bounds.highx-bounds.lowx) + bounds.lowx],
      y: [this.bestSolution[1]* (bounds.highy-bounds.lowy) + bounds.lowy],
      mode: 'markers',
      type: 'scatter3d',
      name: "Best Solution",
      marker: {
        color: 'rgb(255, 50, 50)',
        size: popParams.sizePoints + 3,
      },
      opacity: popParams.opacity,
      uid:351, //Forced ID
    };
    plotID = this.findPlot("Best Solution");
    if(plotID == -1){
      this.mainPlot.data.push(tempData2);
    }else{
      this.mainPlot.data[plotID] = tempData2;
    }
  }
  this.updatePlot();
};
AISearch.findPlot = function(plotName){
  var n = this.mainPlot.data.length;
  for(var i=0;i<n;i++){
    if( this.mainPlot.data[i].name == plotName) return i;
  }
  return -1;
};

AISearch.initPlotly3D = function(plotly, title='Metaheuristics Playground'){
  this.mainPlot.layout = {
    title: title,
    width: "500",
    height: "500",
    showleyend: false,
    scene:{
      aspectmode: "cube",
    }
  };
  this.mainPlot.popParams = {
    highx:1,
    lowx:0,
    highy:1,
    lowy:0,
    sizePoints:7,
    opacity:1
  };
  this.mainPlot.bestParams ={
    sizePoints:10,
    opacity:true,
  }
  if(plotly){
    this.plotly = plotly;
    return 1;
  }
  if(window.Plotly){
    this.plotly = window.Plotly;
    return 1;
  }
  console.log("Plotly library is not pressent");
};

AISearch.updatePlot = function(){
  this.plotly.newPlot(this.mainPlot.div, this.mainPlot.data, this.mainPlot.layout);
}
