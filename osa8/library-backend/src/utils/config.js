require('dotenv').config()

console.log('Setting configurations...')

let PORT = process.env.PORT

let MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const JWT_SECRET = process.env.JWT_SECRET

console.log('Configuration set')

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
}