const os = require('os')
const log = require('./logger')

setInterval(() => {
  const { freemem, totalmem } = os

  const mem = parseInt(freemem() / 1024 ** 2)
  const total = parseInt(totalmem() / 1024 ** 2)
  const percents = 100 - parseInt((mem / total) * 100)

  const stats = {
    free: `${mem} MB`,
    total: `${total} MB`,
    usage: `${percents}%`
  }

  console.clear()
  console.log('====== PC Stats ======')
  console.table(stats)

  log(`${JSON.stringify(stats)}\n`)
}, 1000)
