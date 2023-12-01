const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n')

const sum = values.reduce((acc, string) => {
  let num = ''
  const first = string.match(/[\d]/)
  const last = string.match(/[\d](?!.*\d)/)

  return acc += (num + first + last) / 1
}, 0)

console.log(sum)
