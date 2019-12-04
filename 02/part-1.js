import { readFile } from 'fs';
import { join } from 'path';

function getInputArr(text) {
  return text.replace(/\n+$/, '').split(/,\s?/).map((str) => parseInt(str, 10))
}

function restoreSavedValues(arr){
  const rslt = [...arr];
  rslt[1] = 12;
  rslt[2] = 2;
  return rslt;
}

function computeProgram(arr) {
  const prog = [...arr];
  let idx = 0;
  while (idx < prog.length) {
    switch (prog[idx]) {
      case 1:
        prog[prog[idx+3]] = prog[prog[idx+1]] + prog[prog[idx+2]]
        break;
      case 2:
        prog[prog[idx+3]] = prog[prog[idx+1]] * prog[prog[idx+2]]
        break;
      case 99:
        idx = prog.length
        break;
    }
    idx += 4;
  }
  return prog;
};

readFile(join(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  const arr = getInputArr(data);
  const arrSavedValues = restoreSavedValues(arr);
  const rslt = computeProgram(arrSavedValues);
  console.log('[02 - Part 1] Solution:', rslt[0]);
});
