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
