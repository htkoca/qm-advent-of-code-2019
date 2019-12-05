import { readFile } from 'fs';
import { join } from 'path';

export function getInputArr(text) {
  return text.replace(/\n+$/, '').split('\n').map((val) => val.split(/,\s?/));
}

export function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector.prototype = {
  negate: function() {
    return new Vector(-this.x, -this.y);
  },
  add: function(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  },
  subtract: function(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
}

export function codeToVector(routeCode) {
  const code = routeCode[0]
  const length = parseInt(routeCode.substr(1), 10)
  switch (code) {
    case "U":
      return new Vector(0, length);
    case "D":
      return new Vector(0, -length);
    case "L":
      return new Vector(-length, 0);
    case "R":
      return new Vector(length, 0);
  }
}

export function getLocalVectors(codeSet) {
  return codeSet.map((code) => codeToVector(code)) // turn codes into local vectors
}

export function getAbsoluteVectors(vectorSet, startCoords) {
  return vectorSet.reduce((rslt, vector, idx) => { // convert local vector to absolute vector based on startVector
      rslt.push(rslt[idx].add(vector))
      return rslt;
    }, [ startCoords ])
}

export function getSolution(err, data) {
  if (err) throw err;
  const codeSets = getInputArr(data);
  const vectorSets = codeSets.map((codeSet) => getLocalVectors(codeSet))
  const coordSets = vectorSets.map((vectorSet) => getAbsoluteVectors(vectorSet, new Vector(0,0)))
  const intersections = vectorSets.map((coordSet, setIdx) => coordSet);
  console.log(coordSets);
  console.log('[03 - Part 1] Solution:', '');
}

readFile(join(__dirname, 'input.txt'), 'utf8', getSolution);
