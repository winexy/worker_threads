const { join } = require('path')
const { wrap } = require('comlink')
const { Worker } = require('worker_threads')
const genericPool = require('generic-pool')
const nodeEndpoint = require('comlink/dist/umd/node-adapter')

const factory = {
  create() {
    const worker = new Worker(join(__dirname, 'worker.js'))
    const api = wrap(nodeEndpoint(worker))

    return { threadId: worker.threadId, api }
  },
  destroy(worker) {
    worker.api.terminate()
  },
}

const workerPool = genericPool.createPool(factory, {
  min: 2,
  max: 4,
})

module.exports = { workerPool }
