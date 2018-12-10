// const main = require('./main')
function sum(a, b) {
  return a + b
}
test('test à écrire', () => {
  // console.log('boum', main())
  expect(sum(1, 2)).toBe(3)
})
