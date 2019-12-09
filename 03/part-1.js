import { readFile } from 'fs';
import { join } from 'path';

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
  add (v) {
    return new Vector (this.x + v.x, this.y + v.y);
  }
  subtract (v) {
    return new Vector (this.x - v.x, this.y - v.y);
  }
  manDist (v) {
    const localVec = this.subtract(v);
    return Math.abs(localVec.x) + Math.abs(localVec.y)
  }
}

export function getDirectionVector (code) {
  return { 
    U: new Vector(0, 1),
    D: new Vector(0, -1),
    L: new Vector(-1, 0),
    R: new Vector(1, 0)
  }[code]
}

export function getCoordSets(cmdSets, startVec) {
  return cmdSets.map((cmdSet) => {
    const dict = {};
    let steps = 0;
    let lastPos = startVec;
    cmdSet.forEach((cmd) => {
      const vec = getDirectionVector(cmd[0])
      const length = cmd.slice(1);
      Array.from({ length }).forEach(() => {
        steps = steps + 1;
        lastPos = lastPos.add(vec);
        dict[`${lastPos.x}, ${lastPos.y}`] = { pos: lastPos.add(vec), steps };
      });
    });
    return dict;
  });
}

// currently this only works for 2 wire sets.
export function getIntersects(coordSets) {
  const rslt = {};
  Object.keys(coordSets[0]).forEach((key) => {
    if(!!coordSets[1][key] && !rslt[key]){
      rslt[key] = coordSets[0][key];
    }
  })
  return rslt;
}

export function getClosestIntersect(intersects, startVec) {
  return Object.keys(intersects)
    .map((key) => startVec.manDist(intersects[key].pos))
    .sort((a, b) => a - b )[0];
};

export function getSolution(err, data) {
  if (err) throw err;
  const startVec = new Vector(0, 0);
  const cmdSets = getInputArr(data);
  const coordSets = getCoordSets(cmdSets, startVec);
  const intersects = getIntersects(coordSets);
  const closestIntersect = getClosestIntersect(intersects, startVec);
  console.log('[03 - Part 1] Solution:', closestIntersect);
}

readFile(join(__dirname, 'input.txt'), 'utf8', getSolution);
