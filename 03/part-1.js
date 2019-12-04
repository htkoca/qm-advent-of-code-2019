import { readFile } from 'fs';
import { join } from 'path';

function getInputArr(text) {
  return text.replace(/\n+$/, '').split('\n').map((val) => val.split(/,\s?/));
}

function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

function getCodeVector(routeCode) {
  const code = routeCode[0]
  const length = routeCode.substr(1)
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

function getVertexCoords(arr) {
  return arr.reduce((rslt, routeCode, idx, curArr) => {
    const vector = getCodeVector(routeCode)
    return rslt;
  }, [new Vector(0,0)]);
}

readFile(join(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  const arr = getInputArr(data);
  const lines = arr.map((routeSet) => getVertexCoords(routeSet))
  console.log(lines);
  console.log('[03 - Part 1] Solution:', '');
});
