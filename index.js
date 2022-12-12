const pidusage = require('pidusage')
const express = require('express')
const { workerPool } = require('./worker-entry')
const { render } = require('./render')

setInterval(() => {
  pidusage(process.pid, (err, stats) => {
    const memoryMb = (stats.memory / 1000 / 1000).toFixed(4)
    const cpu = stats.cpu.toFixed(4)

    console.log(`  CPU=${cpu}%, Memory=${memoryMb} mb`)
  })
}, 2000)

const app = express()

app.get('/ping', (req, res) => {
  console.log('ping')
  res.end('pong')
})

app.get('/render', (req, res) => {
  const result = render()
  res.end(`render=${result.count}`)
})

app.get('/worker', (req, res) => {
  workerPool.use(async worker => {
    const result = await worker.api.render()
    res.end(`threadId=${worker.threadId} worker=${result.count}`)
  })
  
})

app.listen(3000)
