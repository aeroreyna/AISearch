AISearch.benchmarkFunctions.brown = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 5 * x[i] - 1;
    }
    var tempSum = 0;
    for(i = 0; i<n-1; i++){
      tempSum += Math.pow(Math.pow(x[i], 2), Math.pow(x[i+1], 2) + 1) +
                 Math.pow(Math.pow(x[i+1], 2),  Math.pow(x[i], 2) +1);
    }
    return tempSum;
  },
  name:"brown",
  lowLimit: -1,
  highLimit: 4,
  minimumFitness:  0,
  minimumPosition2D: [0, 0],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: true,
  multimodal: false,
  multipleGlobal: false,
}
