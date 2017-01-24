function zeros(long,deep){
  var b = [];
  for(var i=0;i<long;i++){
    var a = new Array(deep);
    a.fill(0);
    b.push(a);
  }
  return b;
}
