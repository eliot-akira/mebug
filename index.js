
function debug(name, fn) {
  const logger = fn || console.log
  let log
  log = function(...args) {
    if (!isEnabled(name) && !log.enabled) return
    logger(name, ...args)
  }
  return log
}

function isEnabled(name) {

  if (name[name.length - 1] === '*') return true

  for (let i = 0, len = debug.disabled.length; i < len; i++) {
    if (debug.disabled[i].test(name)) return false
  }
  for (let i = 0, len = debug.enabled.length; i < len; i++) {
    if (debug.enabled[i].test(name)) return true
  }
  return false
}

function enable(namespaces) {

  let name = namespaces
  const enabled = []
  const disabled = []

  // From: https://github.com/visionmedia/debug

  var i
  var split = (typeof name === 'string' ? name : '').split(/[\s,]+/)
  var len = split.length

  for (i = 0; i < len; i++) {
    if (!split[i]) continue // ignore empty strings
    name = split[i].replace(/\*/g, '.*?')
    if (name[0] === '-') {
      disabled.push(new RegExp('^' + name.substr(1) + '$'))
    } else {
      enabled.push(new RegExp('^' + name + '$'))
    }
  }

  debug.enabled = enabled
  debug.disabled = disabled
}

debug.enable = enable
debug.enabled = []
debug.disabled = []
debug.isEnabled = isEnabled

module.exports = debug