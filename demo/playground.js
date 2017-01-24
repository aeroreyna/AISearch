//Benchmark variables
var listBF = AISearch.getBenchmarkList();
var BF = AISearch.benchmarkFunctions;
var selectedBF = BF["ackley"];


//Graph VariablesGraph
var graphData = [];
var layout = {
  title: 'Metaheuristics Playground',
  width: $(window).width(),
  height: $(window).height()+70,
  showleyend: false,
  scene:{
    aspectmode: "cube",
  }
}
var plotDiv = document.getElementById('graph');
var resolutionPlot = 100;
var vueGD = {
  opacity:false,
  sizePoints: 35,
  resolution: 0,
  opacityPoints:100,
  pointBest: true,
  listBF: listBF,
  selectedBF: "ackley",
  lowx:-35,
  lowy:-35,
  highx:35,
  highy:35,
  shownOptimal:false,
};


//graph Functions
var getData = function(size=100){
  var x = new Array(size),
      y = new Array(size),
      z = new Array(size),
      i, j;
  for(var i = 0; i < size; i++) {
    x[i] = y[i] = i / size;
    z[i] = new Array(size);
  }
  for(var i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      z[j][i] = fitness([x[i],y[j]]);
    }
  }
  for(var i = 0; i < size; i++) {
    x[i] = x[i] * (vueGD.highx-vueGD.lowx) + vueGD.lowx;
    y[i] = y[i] * (vueGD.highy-vueGD.lowy) + vueGD.lowy;
  }
  return {x:x, y:y, z:z};
}
var graph3d = function(){
  var t = getData(resolutionPlot);
  graphData = [ {
    z: t.z,
    x: t.x,
    y: t.y,
    type: 'surface',
    name: "Fitness Function",
    showscale: false,
    opacity:1
  }];
  Plotly.newPlot('graph', graphData, layout);
};
var updateResolution = function(){
  var t = getData(resolutionPlot);
  graphData.x = t.x;
  graphData.y = t.y;
  graphData.z = t.z;
  Plotly.update('graph',graphData)
}
function findPlot(plotName){
  var n = plotDiv.data.length;
  for(var i=0;i<n;i++){
    if( plotDiv.data[i].name == plotName) return i;
  }
  return -1;
}
function plotSolutions(){
  var x = [],
      y = [],
      z = [];
  for(var i=0;i<AISearch.sizePopulation;i++){
    x.push(AISearch.population[i][0] * (vueGD.highx-vueGD.lowx) + vueGD.lowx);
    y.push(AISearch.population[i][1] * (vueGD.highy-vueGD.lowy) + vueGD.lowy);
    z.push(AISearch.fitness[i]);
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
      size: vueGD.sizePoints / 5,
    },
    opacity: vueGD.opacityPoints/100,
    uid:350, //Forced ID
  };

  //Plot Population
  var plotID = findPlot("Population");
  if(plotID == -1){
    graphData.push(tempData);
  }else{
    graphData[plotID] = tempData;
  }

  //Plot Best Solution
  if(vueGD.pointBest && AISearch.bestFitness!=Infinity){
    var tempData2 = {
      z: [AISearch.bestFitness],
      x: [AISearch.bestSolution[0]* (vueGD.highx-vueGD.lowx) + vueGD.lowx],
      y: [AISearch.bestSolution[1]* (vueGD.highy-vueGD.lowy) + vueGD.lowy],
      mode: 'markers',
      type: 'scatter3d',
      name: "Best Solution",
      marker: {
        color: 'rgb(255, 50, 50)',
        size: vueGD.sizePoints / 5 + 3,
      },
      opacity: 0.80,
      uid:351, //Forced ID
    };
    plotID = findPlot("Best Solution");
    if(plotID == -1){
      graphData.push(tempData2);
    }else{
      graphData[plotID] = tempData2;
    }
  }

  Plotly.update('graph',graphData);
}

function fitness(x){
  st = $("#MathFunc")[0].value;
  y = x[1];
  x = x[0];
  return eval(st)
}

$(function() {
  graph3d();
  AISearch.fitnessFunction = fitness;
  AISearch.noDimensions = 2;
  AISearch.customPlotFunction = plotSolutions;
  AISearch.sizePopulation=7;
  AISearch.maxNoIterations=10;
  AISearch.operators = AISearch.operatorsPSO;

  $("#MathFunc").keypress(function( event ) {
    //console.log(event)
    if ( event.which == 13 ) {
       event.preventDefault();
       var strTemp = $("#MathFunc")[0].value;
       if($.inArray(strTemp, listBF)!=-1){
        $("#MathFunc")[0].value = "BF." +  strTemp + ".eval([x,y])";
       }
       graph3d();
    }
  })

  $("#RandomStart").click(function(){
    AISearch.initPopulation();
    AISearch.evalPopulation();
    AISearch.plot();
    $("#StartDE").prop( "disabled", false );
    $("#StartPSO").prop( "disabled", false );
  })

  $("#StartDE").click(function(){
    AISearch.operators = AISearch.operatorsDE;
    AISearch.start();
    AISearch.plot();
    $("#StartDE").prop( "disabled", true );
    $("#StartPSO").prop( "disabled", true );
    bfInfo.refresh += 1;
  })
  $("#StartPSO").click(function(){
    AISearch.operators = AISearch.operatorsPSO;
    AISearch.start();
    AISearch.plot();
    $("#StartDE").prop( "disabled", true );
    $("#StartPSO").prop( "disabled", true );
    bfInfo.refresh += 1;
  })

  //Vue stuff
  Vue.use(Keen)
  algControls = new Vue({
    el: "#algControlsVue",
    data:{
      sizePopulation: 7,
      noIter: 10,
    },
    methods:{
      changesF:function(event){
        AISearch.sizePopulation = this.sizePopulation;
        AISearch.maxNoIterations = this.noIter;
      }
    }
  });
  bfInfo = new Vue({
    el: "#BenchmarkInfo",
    data:{
      name:"ackley",
      refresh: 0,
    },
    computed:{
      Separable:function(){return BF[this.name].Separable},
      differenciable:function(){return BF[this.name].differenciable},
      continuous:function(){return BF[this.name].continuous},
      multimodal:function(){return BF[this.name].multimodal},
      minimumPosition2D:function(){return BF[this.name].minimumPosition2D},
      minimumFitness:function(){return BF[this.name].minimumFitness},
      bSol:function(){
        this.refresh + 1;
        var temp = AISearch.bestSolution;
        temp[0] = temp[0] * (vueGD.highx-vueGD.lowx) + vueGD.lowx;
        temp[1] = temp[1] * (vueGD.highy-vueGD.lowy) + vueGD.lowy;
        return temp
      },
      bFit:function(){
        this.refresh + 1;
        return AISearch.bestFitness
      },
      errorPos:function(){
        this.refresh + 1;
        return BF[this.name].minimumFitness
      },
      errorFit:function(){
        this.refresh + 1;
        return Math.abs(BF[this.name].minimumFitness - AISearch.bestFitness)
      },
    }
  })
  graphControls = new Vue({
    el: '#graphControlsVue',
    data: vueGD,
    computed:{
      opacity:{
        get: function(){return graphData[0].opacity != 1;},
        set: function(val){
          graphData[0].opacity = val ? 0.99 : 1;
          Plotly.update("graph");
        }
      },
      selectedBF:{
        set:function(v){
          //here changes all the properties of the benchmark funciton
          //this.selectedBF = v;
          if(typeof BF[v].lowLimit=="number"){
            this.lowx = BF[v].lowLimit;
            this.highx = BF[v].highLimit;
            this.lowy = BF[v].lowLimit;
            this.highy = BF[v].highLimit;
          }else{
            this.lowx = BF[v].lowLimit[0];
            this.highx = BF[v].highLimit[0];
            this.lowy = BF[v].lowLimit[1];
            this.highy = BF[v].highLimit[1];
          }
          $("#MathFunc")[0].value = "BF." +  v + ".eval([x,y])";
          graph3d();
          bfInfo.name = v;
        }
      }
    },
    methods:{
      resChange: function(event){
        resolutionPlot = this.resolution*2 + 100;
        console.dir(event);
      },
      popGraphChange: function(event){
        var plotID = findPlot("Population");
        if(plotID!=-1){
          plotSolutions();
        }
      }
    }
  })
});
