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
