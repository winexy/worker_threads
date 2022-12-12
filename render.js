function render(n = 4_000_000_000) {
  let sum = 0
  console.time('render');
  for (let i = 0; i < n; i++) {
    sum += i
  }
  console.timeEnd('render');
  return { count: sum }
}

module.exports = { render }
