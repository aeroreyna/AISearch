var FitFunc = []
var histFit = []
var AISearch = undefined;

function FitFuncEval(){
  FitFunc = []
  st = $("#MathFunc")[0].value
  for (var i = 0; i < 14; i += 0.1) {
    x = i;
    FitFunc.push([i, eval(st)]);
  }
  $.plot("#graph1", [FitFunc]);
}

function plotSolutions(){
  var population = [];
  for(i=0;i<AISearch.sizePopulation;i++){
    population.push([AISearch.population[i][0]*14,AISearch.fitness[i]]);
  }
  $.plot("#graph1", [{data:FitFunc}, {data:population, points: { show: true }}]);
}

function fitness(x){
  st = $("#MathFunc")[0].value;
  x = x*14;
  return eval(st)
}

$(function() {
  FitFuncEval();
  AISearch = new metaheuristic(fitness,1);
  AISearch.customPlotFunction = plotSolutions;
  AISearch.sizePopulation=7;
  AISearch.maxNoIterations=10;
  AISearch.operators = AISearch.operatorsPSO;

  $("#MathFunc").keypress(function( event ) {
    //console.log(event)
    if ( event.which == 13 ) {
       event.preventDefault();
       FitFuncEval();
    }
  })

  $("#RandomStart").click(function(){
    AISearch.initialPopulation();
    AISearch.evalPopulation();
    AISearch.plot();
  })

  $("#StartDE").click(function(){
    AISearch.start()
  })

  $( "#slider" ).slider({
    slide: function( event, ui ) {
      AISearch.sizePopulation = ui.value > 7 ? ui.value : 7;
      $("#PopSize")[0].value = AISearch.sizePopulation;
    }
  });
  $( "#slider2" ).slider({
    slide: function( event, ui ) {
      AISearch.maxNoIterations = ui.value > 10 ? ui.value : 10;
      $("#NoIter")[0].value = AISearch.maxNoIterations;
    }
  });
});
