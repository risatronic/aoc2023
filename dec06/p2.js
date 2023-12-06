const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n')

const time = values[0].match(/(?:\d+)/g).reduce((a,b) => a+b,'')
const distance = values[1].match(/(?:\d+)/g).reduce((a,b) => a+b,'')
let firstWin, lastWin

for(let i = 1, j = time - 1; i < time, j > i;){
    if(!firstWin && i * (time - i) > distance) firstWin = i
    if(!lastWin && j * (time - j) > distance) lastWin = j

    if(firstWin && lastWin) break
    i++, j--
}

console.log(lastWin - firstWin + 1)
