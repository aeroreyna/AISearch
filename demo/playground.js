//Benchmark variables
var listBF = AISearch.getBenchmarkList();

$(function() {
  AISearch.selectBF("ackley")
  AISearch.noDimensions = 2;
  AISearch.customPlotFunction = AISearch.plotPopulation;
  AISearch.sizePopulation=7;
  AISearch.maxNoIterations=10;
  AISearch.operators = AISearch.operatorsPSO;
  AISearch.initPlotly3D();
  AISearch.mainPlot.layout.width = $(window).width();
  AISearch.mainPlot.layout.height = $(window).height()+70;
  AISearch.plot3D("graph","surface", 100);

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
    //bfInfo.refresh += 1;
  })
  $("#StartPSO").click(function(){
    AISearch.operators = AISearch.operatorsPSO;
    AISearch.start();
    AISearch.plot();
    $("#StartDE").prop( "disabled", true );
    $("#StartPSO").prop( "disabled", true );
    //bfInfo.refresh += 1;
  })
  //Vue stuff
  Vue.use(Keen)
  algControls = new Vue({
    el: "#algControlsVue",
    data:{
      AISearch: AISearch,
    }
  });

  bfInfo = new Vue({
    el: "#BenchmarkInfo",
    data:{
      AISearch: AISearch,
    },
    computed:{
      bSol:function(){
        var temp = AISearch.bestSolution.slice();
        temp[0] = temp[0] * (AISearch.selectedBF.highx-AISearch.selectedBF.lowx) + AISearch.selectedBF.lowx;
        temp[1] = temp[1] * (AISearch.selectedBF.highy-AISearch.selectedBF.lowy) + AISearch.selectedBF.lowy;
        return temp
      },
      bFit:function(){
        return AISearch.bestFitness
      },
      errorPos:function(){
        return AISearch.selectedBF.minimumFitness
      },
      errorFit:function(){
        return Math.abs(AISearch.selectedBF.minimumFitness - AISearch.bestFitness)
      },
    }
  })

  graphControls = new Vue({
    el: '#graphControlsVue',
    data: {
      opacity:false,
      sizePoints: 35,
      resolution: 0,
      opacityPoints:100,
      listBF: listBF,
      selectedBF: "ackley",
      shownOptimal:false,
      AISearch: AISearch,
    },
    computed:{
      opacity:{
        get: function(){
          return AISearch.mainPlot.data[0].opacity != 1 ;
        },
        set: function(val){
          AISearch.mainPlot.data[0].opacity = val ? 0.99 : 1;
          AISearch.updatePlot();
        }
      },
      selectedBF:{
        set:function(v){
          //here changes all the properties of the benchmark funciton
          AISearch.selectBF(v)
          AISearch.plot3D(undefined, "surface", this.resolution*2 + 100);
        }
      }
    },
    methods:{
      popGraphChange: function(event){
        var plotID = AISearch.findPlot("Population");
        if(plotID!=-1){ //the plot exist
          AISearch.mainPlot.popParams.sizePoints = this.sizePoints/5;
          AISearch.mainPlot.popParams.opacity=this.opacityPoints/100;
          AISearch.plotPopulation();
        }
      }
    }
  })
});
