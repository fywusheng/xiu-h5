/*
 * @Description: js中的px转成rem
 * @Version: 0.1
 * @Autor: yjm
 */


function createPxReplace(opts, viewportUnit, viewportSize) {
  return function (m, $1) {
    if (!$1) { return m }
    var pixels = parseFloat($1)
    if (pixels <= opts.minPixelValue) { return m }
    var parsedVal = toFixed((pixels / viewportSize * 100), opts.unitPrecision)
    return parsedVal === 0 ? "0" : parsedVal + viewportUnit
  }
}

function toFixed(number, precision) {
  var multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier)
  return Math.round(wholeNumber / 10) * 10 / multiplier
}

function getUnitRegexp(unit) {
  return new RegExp('"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + unit, 'g');
}

var defaults = {
  unitToConvert: "px",
  viewportWidth: 320,
  viewportHeight: 568, // not now used; TODO: need for different units and math for different properties
  unitPrecision: 5,
  viewportUnit: "vw",
  fontViewportUnit: "vw", // vmin is more suitable.
  selectorBlackList: [],
  propList: ["*"],
  minPixelValue: 1,
  mediaQuery: false,
  replace: true,
  landscape: false,
  landscapeUnit: "vw",
  landscapeWidth: 568
}

const options = require('../../postcss.config').plugins["postcss-px-to-viewport"]

const opts = Object.assign(defaults, options)

var pxRegex = getUnitRegexp(opts.unitToConvert);

function pxToViewport(valule, ratio) {

  if (typeof valule === 'number' && ratio) {
    valule = valule * ratio
  } else if (valule.indexOf('px') && ratio) {
    valule = valule.split('px')[0]
    valule = valule * ratio
  }

  valule = valule.toString()
  if (valule.indexOf('px') == -1) {
    valule = `${valule}px`
  }

  return valule.replace(pxRegex, createPxReplace(opts, opts.landscapeUnit, opts.viewportWidth))
}


export default pxToViewport