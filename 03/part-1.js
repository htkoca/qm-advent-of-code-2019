import { readFile } from 'fs';
import { join } from 'path';
import { findSegmentIntersection } from 'line-intersection';

export function getInputArr(text) {
  return text
    .replace(/\n+$/, '')
    .split('\n')
    .map((val) => val.split(/,\s?/));
}

export class Vector {
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  negate () {
    return new Vector(-this.x, -this.y);
  }
  add (v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  subtract (v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
  manhattanDist (v) {
    const local = this.subtract(v);
    return Math.abs(local.x) + Math.abs(local.y);
  }
}

export function codeToVector(routeCode) {
  const code = routeCode[0];
  const length = parseInt(routeCode.substr(1), 10);
  switch (code) {
    case 'U':
      return new Vector(0, length);
    case 'D':
      return new Vector(0, -length);
    case 'L':
      return new Vector(-length, 0);
    case 'R':
      return new Vector(length, 0);
  }
}

// local vectors describe a direction in X,Y from 0,0 (R1000 = X: 1000, Y: 0)
export function getLocalVectors(codeSets) {
  return codeSets.map((codeSet) => codeSet.map((code) => codeToVector(code)));
}

// absolute vectors describe a coord in X, Y
export function getAbsoluteCoords(vectorSets, startCoords) {
  return vectorSets.map((vectorSet) => {
    return vectorSet.reduce((rslt, vector, idx) => {
      rslt.push(rslt[idx].add(vector));
      return rslt;
    }, [startCoords]);
  });
}

export function getIntersects(coordSets) {
  // placeholder
}

export function getClosestIntersect(intersects) {
  // placeholder
}

export function getSolution(err, data) {
  if (err) throw err;
  const codeSets = getInputArr(data);
  const vectorSets = getLocalVectors(codeSets);
  const coordSets = getAbsoluteCoords(vectorSets, new Vector(0, 0));
  const intersects = getIntersects(coordSets);
  const closestIntersect = getClosestIntersects(intersects);
  console.log('[03 - Part 1] Solution:', closestIntersect);
}

readFile(join(__dirname, 'input.txt'), 'utf8', getSolution);
