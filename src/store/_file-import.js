const fs = require('fs')
const path = require('path')

export default (d, p) => fs.readFileSync(path.join(d, p), 'utf8')
