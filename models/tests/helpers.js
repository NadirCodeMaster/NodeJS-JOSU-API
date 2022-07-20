const faker = require('faker')

const PROVIDER = ['google', 'microsoft', 'zoom']
const STATUS = ['yes', 'maybe', 'no', 'unknown', 'deleted']
const USER_ID = faker.random.uuid()

global.console = { log: jest.fn(), error: jest.fn(), warn: jest.fn() }

module.exports = { PROVIDER, STATUS, USER_ID }
