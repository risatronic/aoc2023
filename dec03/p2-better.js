const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n').map(x => `.${x}.`)

function findLeft(x, y, numbers, num){
  let num = num ? num : ''
  let i = x - 1

}

function findRight(x, y, numbers, num){
  let num = num ? num : ''

}

function findNumbers(x, y, above, below) {
  const numbers = []
  let i, num

  if (!isNaN(Number(values[y][x - 1]))) {
    num = ''
    i = x - 1

    while (values[y][i].match(/[\d]/)) {
      num = values[y][i] + num
      i -= 1
    }

    numbers.push(Number(num))
  }

  if (!isNaN(Number(values[y][x + 1]))) {
    num = ''
    i = x + 1

    while (values[y][i].match(/[\d]/)) {
      num = num + values[y][i]
      i += 1
    }

    numbers.push(Number(num))
  }

  if (above >= 0) {
    if (!isNaN(Number(values[y - 1][x]))) {
      if (numbers.length >= 2) return false

      num = values[y - 1][x]
      i = x - 1

      while (values[y - 1][i].match(/[\d]/)) {
        num = values[y - 1][i] + num
        i -= 1
      }

      i = x + 1

      while (values[y - 1][i].match(/[\d]/)) {
        num = num + values[y - 1][i]
        i += 1
      }

      numbers.push(Number(num))
    } else {
      if (!isNaN(Number(values[y - 1][x - 1]))) {
        if (numbers.length >= 2) return false

        num = ''
        i = x - 1

        while (values[y - 1][i].match(/[\d]/)) {
          num = values[y - 1][i] + num
          i -= 1
        }

        numbers.push(Number(num))
      }

      if (!isNaN(Number(values[y - 1][x + 1]))) {
        if (numbers.length >= 2) return false

        num = ''
        i = x + 1

        while (values[y - 1][i].match(/[\d]/)) {
          num = num + values[y - 1][i]
          i += 1
        }

        numbers.push(Number(num))
      }
    }
  }

  if (below >= 1) {
    if (!isNaN(Number(values[y + 1][x]))) {
      if (numbers.length >= 2) return false

      num = values[y + 1][x]
      i = x - 1

      while (values[y + 1][i].match(/[\d]/)) {
        num = values[y + 1][i] + num
        i -= 1
      }

      i = x + 1

      while (values[y + 1][i].match(/[\d]/)) {
        num = num + values[y + 1][i]
        i += 1
      }

      numbers.push(Number(num))
    } else {
      if (!isNaN(Number(values[y + 1][x - 1]))) {
        if (numbers.length >= 2) return false

        num = ''
        i = x - 1

        while (values[y + 1][i].match(/[\d]/)) {
          num = values[y + 1][i] + num
          i -= 1
        }

        numbers.push(Number(num))
      }

      if (!isNaN(Number(values[y + 1][x + 1]))) {
        if (numbers.length >= 2) return false

        num = ''
        i = x + 1

        while (values[y + 1][i].match(/[\d]/)) {
          num = num + values[y + 1][i]
          i += 1
        }

        numbers.push(Number(num))
      }
    }
  }

  return numbers.length == 2 ? numbers : false
}

const sum = values.reduce((acc, line, index) => {
  const stars = line.matchAll(/\*/g)
  const above = index - 1 >= 0 ? index - 1 : -1
  const below = index + 1 < values.length ? index + 1 : -1

  for (const star of stars) {
    const numbers = findNumbers(star.index, index, above, below)

    if (numbers) acc += numbers[0] * numbers[1]
  }

  return acc
}, 0)

console.log(sum)
