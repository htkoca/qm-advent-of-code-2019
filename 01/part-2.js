import { readFile } from 'fs';
import { join } from 'path';

export function getInputArr(text) {
  return text.replace(/\n+$/, '').split('\n').map((val) => parseInt(val, 10));
}

export function getFuelMass(mass){
  return Math.floor(mass/3) - 2;
}

export function recurseFuelMass(mass){
  const fuel = getFuelMass(mass);
  return fuel > 0 ? fuel + recurseFuelMass(fuel) : 0;
}

export function computeTotalFuelMass(arr){
  return arr.map(recurseFuelMass).reduce((sum, val) => sum + val, 0);
}

export function getSolution(err, data) {
  if (err) throw err;
  const arr = getInputArr(data);
  const rslt = computeTotalFuelMass(arr);
  console.log('[01 - Part 2] Solution:', rslt);
}

readFile(join(__dirname, 'input.txt'), 'utf8', getSolution);
