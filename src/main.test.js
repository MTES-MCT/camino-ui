// const main = require('./main')
function sum(a, b) {
  return a + b
}
test('adds 1 + 2 to equal 3', () => {
  // console.log('boum', main())
  expect(sum(1, 2)).toBe(3)
})
