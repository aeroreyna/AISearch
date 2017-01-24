function sortArg(A){
  No = A.length;
  indexs = [];
  for(i=0;i<No;i++){
    newInd = 0;
    minVal = Infinity;
    for(k=0;k<No;k++){
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
function isInIt(A, val){
  for(j=0;j<A.length;j++){
    if(A[j] == val ) return true;
  }
  return false;
}
