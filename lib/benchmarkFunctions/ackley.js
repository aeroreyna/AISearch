AISearch.benchmarkFunctions.ackley = {
  eval: function(x){
    var n = x.length,
        i = 0;
    for(i = 0; i<n; i++){
      x[i] = 70 * x[i] - 35;
    }
    var a=20,
        b=0.2,
        c=2*Math.PI,
        tempSum = 0, //sum(x.^2)
        tempSum2 = 0; //sum(cos(x.*c))
    for(i = 0; i<n; i++){
      tempSum += Math.pow(x[i],2);
      tempSum2 += Math.cos(x[i] * c);
    }
    return -a * Math.exp(-b*Math.sqrt(1/n*tempSum)) - Math.exp(1/n*tempSum2) + a + Math.exp(1);
  },
  name: "ackley",
  lowLimit: -35,
  highLimit: 35,
  minimumFitness: 0,
  minimumPosition2D: [0,0],
  continuous: true,
  differenciable: true,
  Separable: false,
  scalable: true,
  multimodal: true,
  multipleGlobal: false,
}
