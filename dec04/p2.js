const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n')

const cards = {}

for(const [index, line] of values.entries()) {
  const card = line.replaceAll('  ', ' 0').split(': ').slice(1, 3)[0].split(' | ')
  const winningNums = card[0].split(' ').map(x => Number(x))
  const playerNums = card[1].split(' ').map(x => Number(x))
  let cardCount = 0

  if(!cards[index]) cards[index] = 1
  else cards[index]++

  for(const num of playerNums){
    if(winningNums.includes(num)) cardCount++
  }

  for(let i = cardCount; i > 0; i--){
    const lastCard = index + i

    if(!cards[lastCard]) cards[lastCard] = cards[index]
    else cards[lastCard] += cards[index]
  }
}

const sum = Object.values(cards).reduce((a, b) => a+b, 0)

console.log(sum)
