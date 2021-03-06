var FitFunc = []
var histFit = []
function FitFuncEval(){
  FitFunc = []
  st = $("#MathFunc")[0].value
  for (var i = 0; i < 14; i += 0.1) {
    x = i;
    FitFunc.push([i, eval(st)]);
  }
  $.plot("#placeholder", [FitFunc])
}
function IniciaAI(){
  AISearch.InicializaPoblacion()
  AISearch.EvaluaDesempeno()
  AISearch.plotID = "#placeholder"
  AISearch.FitFunc = FitFunc;
  AISearch.plot(FitFunc)
}
$(function() {
  FitFuncEval()

  $("#MathFunc").keypress(function( event ) {
    //console.log(event)
    if ( event.which == 13 ) {
       event.preventDefault();
       FitFuncEval();
    }
  })

  $("#RandomStart").click(function(){
    FitFuncEval()
    IniciaAI()
  })

  $("#StartDE").click(function(){
    AISearch.Operadores = AISearch.DEOperadores
    //AISearch.Start(); //fast
    AISearch.ActIte = AISearch.NoIter
    $("#Controls").fadeOut()
    histFit = [];
    setTimeout(slowAIStart, 500)
  })

  function slowAIStart(){
    AISearch.Operadores()
    AISearch.sort()
    histFit.push([histFit.length,AISearch.FitPob[0]]);
    AISearch.plot()
    //AISearch.ActIte = AISearch.ActIte - 1
    if (AISearch.ActIte-- > 0){
       setTimeout(slowAIStart, 500)
     }else{
       $("#Controls").fadeIn();
       $.plot("#EvoPlot", [histFit]);
     }
  }

  $( "#slider" ).slider({
    slide: function( event, ui ) {
      AISearch.PopSize = ui.value > 7 ? ui.value : 7
      $("#PopSize")[0].value = AISearch.PopSize
    }
  });
  $( "#slider2" ).slider({
    slide: function( event, ui ) {
      AISearch.NoIter = ui.value > 10 ? ui.value : 10
      $("#NoIter")[0].value = AISearch.NoIter
    }
  });
});
