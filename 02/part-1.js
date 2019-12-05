import { readFile } from 'fs';
import { join } from 'path';

export function getInputArr(text) {
  return text.replace(/\n+$/, '').split(/,\s?/).map((str) => parseInt(str, 10));
}

export function restoreSavedValues(arr){
  const rslt = [...arr];
  rslt[1] = 12;
  rslt[2] = 2;
  return rslt;
}

export function computeProgram(arr) {
  const prog = [...arr];
  let address = 0;
  while (address < prog.length) {
    switch (prog[address]) {
      case 1:
        prog[prog[address+3]] = prog[prog[address+1]] + prog[prog[address+2]]
        address += 4;
        break;
      case 2:
        prog[prog[address+3]] = prog[prog[address+1]] * prog[prog[address+2]]
        address += 4;
        break;
      case 99:
        address = prog.length
        break;
    }
  }
  return prog;
};

export function getSolution(err, data) {
  if (err) throw err;
  const arr = getInputArr(data);
  const arrSavedValues = restoreSavedValues(arr);
  const program = computeProgram(arrSavedValues);
  const rslt = program[0]
  console.log('[02 - Part 1] Solution:', rslt);
}

readFile(join(__dirname, 'input.txt'), 'utf8', getSolution);
