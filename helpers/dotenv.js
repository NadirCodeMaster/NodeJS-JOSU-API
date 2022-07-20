const dotenv = require('dotenv')

const { NODE_ENV } = process.env

const IS_PROD = NODE_ENV === 'prod'
const IS_TEST = NODE_ENV === 'test'

dotenv.config({ path: IS_PROD ? '.env' : '.env.local' })

module.exports = { IS_PROD, IS_TEST }
