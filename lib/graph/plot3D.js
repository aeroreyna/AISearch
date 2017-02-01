AISearch.plot3D = function(div=undefined, type="surface", resolution=100){
  if(div){
    this.mainPlot.div = div;
  }else{
    if(this.mainPlot.div){
      div = this.mainPlot.div;
    }else{
      console.error("No HTML div was given")
    }
  }
  if(this.noDimensions < 2) console.error("Dimensions dismatch");
  if(this.noDimensions > 2) console.warn("Only 2 dimensions can be plot");
  var t = this.graphData(type, resolution);
  this.mainPlot.data = [ {
    z: t.z,
    x: t.x,
    y: t.y,
    type: type,
    name: "Fitness Function",
    showscale: false,
    opacity:1
  }];
  this.updatePlot();
}
