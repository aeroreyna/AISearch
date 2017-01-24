AISearch.benchmarkFunctions.alpine = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 20 * x[i] - 10;
    }
    var tempSum = 0;
    for(i = 0; i<n; i++){
      tempSum += Math.abs(x[i]*Math.sin(x[i])+0.1*x[i]);
    }
    return tempSum;
  },
  name:"alpine",
  lowLimit: -10,
  highLimit: 10,
  minimumFitness: 0,
  minimumPosition2D: [0,0],
  continuous: true,
  differenciable: false,
  Separable: true,
  scalable: true,
  multimodal: true,
  multipleGlobal: false,
}
