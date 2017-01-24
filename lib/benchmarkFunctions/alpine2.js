AISearch.benchmarkFunctions.alpine2 = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 10 * x[i];
    }
    var tempSum = 1;
    for(i = 0; i<n; i++){
      tempSum *= Math.sqrt(x[i])*Math.sin(x[i]);
    }
    return tempSum;
  },
  name:"alpine",
  lowLimit: 0,
  highLimit: 10,
  minimumFitness: 7.8849,
  minimumPosition2D: [7.917,7.917],
  continuous: true,
  differenciable: true,
  Separable: true,
  scalable: true,
  multimodal: true,
  multipleGlobal: false,
}
