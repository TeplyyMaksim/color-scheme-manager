export default function (r,g,b) {
  var computedC = 0;
  var computedM = 0;
  var computedY = 0;
  var computedK = 0;

  //remove spaces from input RGB values, convert to int
  var r = parseInt( (''+r).replace(/\s/g,''),10 );
  var g = parseInt( (''+g).replace(/\s/g,''),10 );
  var b = parseInt( (''+b).replace(/\s/g,''),10 );

  // BLACK
  if (r==0 && g==0 && b==0) {
   computedK = 1;
   return [0,0,0,1];
  }

  computedC = 1 - (r/255);
  computedM = 1 - (g/255);
  computedY = 1 - (b/255);

  var minCMY = Math.min(computedC,
               Math.min(computedM,computedY));
  computedC = parseInt((computedC - minCMY) / (1 - minCMY) * 100);
  computedM = parseInt((computedM - minCMY) / (1 - minCMY) * 100) ;
  computedY = parseInt((computedY - minCMY) / (1 - minCMY) * 100) ;
  computedK = parseInt(minCMY * 100);

  return [computedC,computedM,computedY,computedK];
 }
