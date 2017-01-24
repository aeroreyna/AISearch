AISearch.benchmarkFunctions.booth = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 20 * x[i] - 10;
    }
    return Math.pow(x[0]+2*x[1]-7, 2) + Math.pow(2*x[0]+x[1]-5, 2);
  },
  name: "booth",
  lowLimit: -10,
  highLimit: 10,
  minimumFitness: 0,
  minimumPosition2D: [1,3],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: false,
  multimodal: false,
  multipleGlobal: false,
}
