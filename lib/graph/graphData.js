AISearch.graphData = function(type="surface", resolution=100){
  bounds = this.selectedBF || {highx:1, highy:1, lowx:0, lowy:0};
  if(type=="surface"){
    var x = new Array(resolution),
        y = new Array(resolution),
        z = new Array(resolution),
        i, j;
    for(var i = 0; i < resolution; i++) {
      x[i] = y[i] = i / resolution;
      z[i] = new Array(resolution);
    }
    for(var i = 0; i < resolution; i++) {
      for(j = 0; j < resolution; j++) {
        z[j][i] = this.fitnessFunction([x[i],y[j]]);
      }
    }
    //Adjust Bondaries
    for(var i = 0; i < resolution; i++) {
      x[i] = x[i] * (bounds.highx-bounds.lowx) + bounds.lowx;
      y[i] = y[i] * (bounds.highy-bounds.lowy) + bounds.lowy;
    }
    return {x:x, y:y, z:z};
  }
};
