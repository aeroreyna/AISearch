AISearch.benchmarkFunctions.bartels = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 9 * x[i] - 4.5;
    }
    return Math.pow(1.5   - x[0] + x[0]*x[1], 2) +
           Math.pow(2.25  - x[0] + x[0]*Math.pow(x[1],2),2) +
           Math.pow(2.625 - x[0] + x[0]*Math.pow(x[1],3),2);
  },
  name: "bartels",
  lowLimit: -4.5,
  highLimit: 4.5,
  minimumFitness: 0,
  minimumPosition2D: [3, 0.5],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: false,
  multimodal: false,
  multipleGlobal: false,
}
