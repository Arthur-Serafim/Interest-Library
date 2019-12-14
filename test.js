const SimpleInterest = require('./SimpleInterest')

const client = new SimpleInterest(2000, 1000, 1000, '', '')

console.log(client.populateFields())