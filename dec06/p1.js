const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n')

const times = values[0].match(/(?:\d+)/g)
const distances = values[1].match(/(?:\d+)/g)
let waysToWin = 1

for(const [index, time] of times.entries()){
  const distance = distances[index]
  let wins = 0

  for(let i = 1; i < time; i++){
    if(i * (time - i) > distance){
      wins++
    }
  }

  waysToWin *= wins
}

console.log(waysToWin)
