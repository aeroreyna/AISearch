AISearch.selectBF = function(name){
  this.selectedBF = this.benchmarkFunctions[name];
  if(this.selectedBF){
    this.fitnessFunction = this.selectedBF.eval;
    if(typeof this.selectedBF.lowLimit=="number"){
      this.selectedBF.lowx = this.selectedBF.lowLimit;
      this.selectedBF.highx = this.selectedBF.highLimit;
      this.selectedBF.lowy = this.selectedBF.lowLimit;
      this.selectedBF.highy = this.selectedBF.highLimit;
    }else{
      this.selectedBF.lowx = this.selectedBF.lowLimit[0];
      this.selectedBF.highx = this.selectedBF.highLimit[0];
      this.selectedBF.lowy = this.selectedBF.lowLimit[1];
      this.selectedBF.highy = this.selectedBF.highLimit[1];
    }
  }
}
