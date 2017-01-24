AISearch.benchmarkFunctions.schwefel = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 1000 * x[i] - 500;
    }
    var tempSum = 0;
    for(i = 0; i<n; i++){
      tempSum += -x[i] * Math.sin(Math.sqrt(Math.abs(x[i])));
    }
    return 418.9829 * n + tempSum;
  },
  name:"schwefel",
  lowLimit: -500,
  highLimit: 500,
  minimumFitness: 0,
  minimumPosition2D: [1,3],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: true,
  multimodal: true,
  multipleGlobal: false,
  }
