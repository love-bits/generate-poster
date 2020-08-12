#!/usr/bin/env node

const program = require('commander')
const package = require('./package.json')
const sharp = require('sharp')
const fs = require('fs')
const mock = require('./mock')

const svgOriginalPath = './assets/img/cartaz-base.svg';
const svgNewPath = './temp.svg'

const modifySvg = (options) => {
  let svg = fs.readFileSync(svgOriginalPath, 'utf-8')

  Object.keys(mock).forEach(el => {
    if (options[el]) svg = svg.replace(mock[el], options[el])
  });

  return fs.writeFileSync(svgNewPath, svg, 'utf-8')
}

const saveToPng = prefix => sharp(svgNewPath).png().toFile(prefix + '.png')

const createPoster = (options, fileName) => {
  modifySvg(options)
  saveToPng(fileName)
}

program.version(package.version)

program
    .command('generate [fileName]')
    .description('Generate meetup poster')
    .option('-p, --presenter [presenter]', 'Change presenter name')
    .option('-d, --date [date]', 'Change poster date')
    .option('-h, --hour [hour]', 'Change poster hour')
    .option('-r, --role [role]', 'Change presenter role')
    .option('-l, --link [link]', 'Change meetup link')
    .action((fileName, options) => {
        createPoster(options, fileName)
    });

program.parse(process.argv)