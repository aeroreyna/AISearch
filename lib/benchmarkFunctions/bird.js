AISearch.benchmarkFunctions.bird = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 4*Math.PI * x[i] - 2*Math.PI;
    }
    return Math.sin(x[0])*Math.exp(Math.pow(1-Math.cos(x[1]),2)) +
           Math.cos(x[1])*Math.exp(Math.pow(1-Math.sin(x[0]),2)) +
           Math.pow(x[0]-x[1],2);
  },
  name: "bird",
  lowLimit: -2*Math.PI,
  highLimit: 2*Math.PI,
  minimumFitness: -106.764537,
  minimumPosition2D: [[4.70104, 3.15294],[-1.58214, -3.13024]],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: false,
  multimodal: true,
  multipleGlobal: true,
};
