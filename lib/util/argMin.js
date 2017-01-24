function argmin(A){
  var No = A.length;
  var indexs = [];
  var newInd = 0;
  var minVal = Infinity;
  for(var k=0;k<No;k++){
    if (A[k]<minVal){
      minVal = A[k];
      newInd = k;
    }
  }
  return newInd;
}
