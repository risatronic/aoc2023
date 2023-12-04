const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n').map(x => `.${x}.`)

const symbol = RegExp(/[^a-zA-Z0-9\.]/g)

const sum = values.reduce((acc, line, index) => {
  const nums = new Set([...line.match(/(?:\d+)/g)])

  if (nums) {
    const above = index - 1 >= 0 ? index - 1 : -1
    const below = index + 1 < values.length ? index + 1 : -1

    for (const num of nums) {
      const fullNumber = RegExp('(?<![0-9])(?:' + num + ')(?![0-9])', 'g')
      const matches = line.matchAll(fullNumber)

      for (const match of matches) {
        const end = match.index + num.length
        const left = match.index - 1
        const right = end + 1

        if (
          (above >= 0 && values[above].slice(left, right).match(symbol)) ||
          (below >= 0 && values[below].slice(left, right).match(symbol)) ||
          line[left].match(symbol) ||
          line[end].match(symbol)
        ) {
          acc += num / 1
        }
      }
    }
  }

  return acc
}, 0)

console.log(sum)
