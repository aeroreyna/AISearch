function rand(long,deep){
  var a = zeros(long,deep);
  for(var i=0;i<long;i++){
    for(var j=0;j<deep;j++){
      a[i][j] = Math.random();
      //console.log(a)
    }
  }
  return a;
}
function randperm(N){
  var perm = [];
  var initialPerm = zeros(N,1);
  for(var i=0;i<N;i++) initialPerm[i]=i;
  for(var i=0;i<N;i++){
    var index = randi(initialPerm.length);
    perm.push(initialPerm.splice(index,1)[0]);
  }
  return perm;
}
function randi(N){
  return Math.floor(Math.random()*N-0.000001);
}
