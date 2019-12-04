import fs from 'fs';
import path from 'path';

function getInputArr(text) {
  return text.replace(/\n+$/, '').split('\n').map((val) => parseInt(val, 10));
}

function getFuelMass(mass){
  return Math.floor(mass/3) - 2;
}

function recurseFuelMass(mass){
  const fuel = getFuelMass(mass);
  return fuel > 0 ? fuel + recurseFuelMass(fuel) : 0;
}

function computeTotalFuelMass(arr){
  return arr.map(recurseFuelMass).reduce((sum, val) => sum + val, 0);
}

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  const arr = getInputArr(data);
  const rslt = computeTotalFuelMass(arr);
  console.log('[1.2] Solution:', rslt);
});
