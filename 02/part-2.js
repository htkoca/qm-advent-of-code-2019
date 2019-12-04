import { readFile } from 'fs';
import { join } from 'path';

function getInputArr(text) {
  return text.replace(/\n+$/, '').split(/,\s?/).map((str) => parseInt(str, 10));
}

function computeProgram(arr) {
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


function findProgramMatch(arr, target) {
  const rangeArr = Array.from({length: 100});
  let rslt;
  rangeArr.some((val, noun) => {
    return rangeArr.some((val, verb) => {
      const curArr = [...arr];
      curArr[1] = noun;
      curArr[2] = verb;
      rslt = computeProgram(curArr);
      return rslt[0] === target;
    });
  });
  return rslt;
}


readFile(join(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  const arr = getInputArr(data);
  const match = findProgramMatch(arr, 19690720)
  const rslt = 100 * match[1] + match[2];
  console.log('[02 - Part 2] Solution:', rslt);
});
