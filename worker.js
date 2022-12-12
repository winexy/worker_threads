const { parentPort } = require('worker_threads');
const { expose } = require('comlink');
const nodeEndpoint = require('comlink/dist/umd/node-adapter');
const { render } = require('./render');

const api = {
  render: render
};

expose(api, nodeEndpoint(parentPort));