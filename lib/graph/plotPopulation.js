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
