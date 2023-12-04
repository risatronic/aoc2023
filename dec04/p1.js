const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n')

const sum = values.reduce((acc, line) => {
  const card = line.replaceAll('  ', ' 0').split(': ').slice(1, 3)[0].split(' | ')
  const winningNums = card[0].split(' ').map(x => Number(x))
  const playerNums = card[1].split(' ').map(x => Number(x))
  let value

  for(const num of playerNums){
    if(winningNums.includes(num)) value = value ? value * 2 : 1
  }

  if(value >= 1) acc += value

  return acc
}, 0)

console.log(sum)
