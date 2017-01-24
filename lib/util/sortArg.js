function sortArg(A){
  var No = A.length;
  var indexs = [];
  var newInd = 0;
  var minVal = Infinity;
  for(var i=0;i<No;i++){
    newInd = 0;
    minVal = Infinity;
    for(var k=0;k<No;k++){
      if(isInIt(indexs,k)==false){
        if (A[k]<minVal){
          minVal = A[k];
          newInd = k;
        }
      }
    }
    indexs.push(newInd)
  }
  return indexs;
}
