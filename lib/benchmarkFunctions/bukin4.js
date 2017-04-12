AISearch.benchmarkFunctions.bukin4 = {
  eval: function(x){
    var n = x.length,
        i = 0;
    x[0] = x[0] * 10 - 15;
    x[1] = x[1] * 6 - 3;
    return 100*Math.pow(x[1],2) + 0.01 * Math.abs(x[0]+10);
  },
  name:"bukin4",
  lowLimit: [-15, -3],
  highLimit: [-5, 3],
  minimumFitness:  0,
  minimumPosition2D: [-10, 0],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: false,
  multimodal: true,
  multipleGlobal: false,
}
