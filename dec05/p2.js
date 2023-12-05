const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
const values = input.substring(0, input.lastIndexOf('\n')).split('\n\n')

function createMap(item){
  return values.shift().split('\n').map(x => x.split(' ').map(y => Number(y))).reduce(mapper, {item})
}

function mapper(acc, line){
  if(!isNaN(line[1])){
    acc[line[1]] = {[acc.item]: line[0], range: line[2]}
  }

  return acc
}

function getMappedValue(prevItem, currentItem, mappedObject){
  let value

  if(mappedObject[prevItem]){
    value = mappedObject[prevItem][currentItem]
  } else {
    for(const mappedItem in mappedObject){
      if(+prevItem >= +mappedItem && +prevItem <= +mappedItem + +mappedObject[mappedItem].range){
        let diff = +prevItem - +mappedItem
        value = +mappedObject[mappedItem][currentItem] + diff
        break
      }
    }
  }

  return value ? value : prevItem
}

const seeds = values.shift().split(' ').map(x => Number(x))
const seedSoilMap = createMap('soil')
const soilFertMap = createMap('fertiliser')
const fertWaterMap = createMap('water')
const waterLightMap = createMap('light')
const lightTempMap = createMap('temp')
const tempHumMap = createMap('humidity')
const humLocMap = createMap('location')
let lowestLoc

for(const [index, seed] of seeds.entries()){
  if(index % 2 == 0) continue

  let initialSeed = seed
  let range = seeds[index + 1]

  for(let i = 0; i < range; i++){
    const currentSeed = initialSeed + i

    const soil = getMappedValue(currentSeed, 'soil', seedSoilMap)
    const fertiliser = getMappedValue(soil, 'fertiliser', soilFertMap)
    const water = getMappedValue(fertiliser, 'water', fertWaterMap)
    const light = getMappedValue(water, 'light', waterLightMap)
    const temp = getMappedValue(light, 'temp', lightTempMap)
    const humidity = getMappedValue(temp, 'humidity', tempHumMap)
    const location = getMappedValue(humidity, 'location', humLocMap)
  
    if(!lowestLoc || location < lowestLoc) lowestLoc = location
  }
}

console.log(lowestLoc)
