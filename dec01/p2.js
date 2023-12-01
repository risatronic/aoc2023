const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n')

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const sum = values.reduce((acc, string) => {
  let num = ''
  let first = string.match(/[\d]|one|two|three|four|five|six|seven|eight|nine/)
  let last = string.match(/([\d]|one|two|three|four|five|six|seven|eight|nine)(?=.*([\d]|one|two|three|four|five|six|seven|eight|nine))/)

  first = Number(first) ? first : numbers[first]

  if(!last){
    last = first
  } else {
    last = Number(last[2]) ? last[2] : numbers[last[2]]
  }

  return acc += (num + first + last) / 1
}, 0)

console.log(sum)
