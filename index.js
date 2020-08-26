#!/usr/bin/env node

const program = require('commander')
const { version } = require('./package.json')
const sharp = require('sharp')
const { writeFileSync, readFileSync} = require('fs')
const mock = require('./mock')
const { JSDOM } = require("jsdom")

const svgOriginalPath = './assets/img/cartaz-base.svg'
const svgNewPath = './temp.svg'

const modifySvg = (options) => {
  const svg = readFileSync(svgOriginalPath, 'utf-8')
  const window = new JSDOM(svg).window
  const document = window.document.getElementsByTagName("svg")[0]

  options.subtitle = ' '

  if (options.title && options.title.length > 23) {
    let title = ''
    let lastSpace = options.title.lastIndexOf(' ')

    if (lastSpace >= 22) lastSpace = options.title.substring(0, lastSpace - 1).lastIndexOf(' ')

    title = options.title.substring(0, lastSpace)
    options.subtitle = options.title.substring(lastSpace + 1)
    options.title = title
  }

  Object.keys(mock).forEach(el => {
    if (options[el]) {
      let element = document.getElementById(el)
      if (el == 'image') {
        element.setAttribute('xlink:href', options.image)
        return
      }

      element.innerHTML = options[el];

      if (mock[el]['height']) {
        let diff = mock[el]['text'].length - options[el].length

        if (diff > 0) {
          let pos = element.getAttribute('x')
          element.setAttribute('x', parseFloat(pos) + (diff * mock[el]['height']))
        }
      }
    }
  })
  
  return writeFileSync(svgNewPath, document.outerHTML, 'utf-8')
}

const saveToPng = prefix => sharp(svgNewPath).png().toFile(prefix + '.png')

const createPoster = (options) => {
  modifySvg(options)
  saveToPng(options.fileName)
}

program.version(version)

program
    .description('Generate Love Bits meetup poster\n\nRemember: Use double quote in arguments with space')
    .option('-f, --fileName [filename]', 'Set the file name', 'poster')
    .option('-p, --presenter [presenter]', 'Set presenter name')
    .option('-t, --title [title]', 'Set meetup title')
    .option('-d, --date [date]', 'Set meetup date -> Format dd/mm')
    .option('-h, --hour [hour]', 'Set meetup hour -> Format 00:00')
    .option('-r, --role [role]', 'Set presenter role')
    .option('-l, --link [link]', 'Set meetup link')
    .option('-i, --image [image]', 'Set presenter image')
    .action(options => createPoster(options));

program.parse(process.argv)