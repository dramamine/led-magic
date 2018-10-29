const inquirer = require('inquirer');
const fs = require('fs');
const config = require('./config')
const {setColor, hexToRgb, getGradients, blackout} = require('./utils')
const {hslToRgb} = require('./color-conversion')
const {basicTriangle, zoomTriangle} = require('./triangle-patterns');

const activateFirstLights = () => {
  config.groups.all.forEach(fixture => {
    setColor(fixture, 0, [200, 200, 200])
  });
}

const activateLastLights = () => {
  config.groups.all.forEach(fixture => {
    setColor(fixture, 27, [200, 200, 200])
  });
}

let ticks = 0
const first_and_last_then_pretty = () => {
  ticks = ticks + 1

  // prettify(ticks)

  if (ticks > 240) {
    return prettify(ticks)
  }

  if (ticks % 24 !== 0) return
  if (Math.floor(ticks/24) % 2 == 0) {
    blackout(config)
  } else if (Math.floor(ticks/24) % 4 == 1) {
    activateFirstLights()
  } else if (Math.floor(ticks/24) % 4 == 3) {
    activateLastLights()
  }
}

const triangle_patterns = () => {
  ticks = ticks + 1
  config.groups.all.forEach((fixture, pos) => {
    zoomTriangle(fixture, ticks, pos)
  });
}

const exit = () => {
  // clearInterval(loop)
  blackout(config, () => {
    console.log('blackin out.');
    process.exit(0)
  })
}

module.exports = {
  triangle_patterns,
  first_and_last_then_pretty,
  exit
}