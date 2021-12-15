const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

const data = require('./urls.json')

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err

      cb(JSON.stringify({ message: 'OK' }))
    }
  )
}

http
  .createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query

    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*'
    })

    // Show all resources
    if (!name || !url) return res.end(JSON.stringify(data))

    // Delete resources
    if (del) {
      data.urls = data.urls.filter((item) => String(item.url) !== String(url))

      return writeFile((message) => res.end(message))
    }

    // Create resources
    data.urls.push({ name, url })

    return writeFile((message) => res.end(message))
  })
  .listen(3334, () => console.log('API is running...'))
