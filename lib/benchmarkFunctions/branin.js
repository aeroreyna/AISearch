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
