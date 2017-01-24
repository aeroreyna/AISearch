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
