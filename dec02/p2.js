const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n')

const games = {}
let sum = 0

for(const [index, value] of values.entries()){
  const game = index + 1
  const cubes = {
    red: 0,
    blue: 0,
    green: 0
  }

  const cubeArray = value.split(': ')[1].replaceAll(';', ',').split(', ')

  for(let set of cubeArray){
    set = set.split(' ')

    if(cubes[set[1]] < set[0] / 1){
      cubes[set[1]] = set[0] / 1
    }
  }
  
  games[game] = cubes
}

for(const game in games){
    sum += games[game].red * games[game].blue * games[game].green
}

console.log(sum)
