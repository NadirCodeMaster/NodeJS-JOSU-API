const defaults = require('superagent-defaults')
const faker = require('faker')
const jwt = require('jsonwebtoken')
const request = require('supertest')

const { JWT_SECRET } = process.env

const PROMPT = ['concent', 'none', 'select_account']
const PROVIDER = ['google', 'microsoft', 'zoom']
const STATUS = ['yes', 'maybe', 'no', 'unknown', 'deleted']

const USER_ID = faker.random.uuid()
const BEARER_TOKEN = jwt.sign({ user_id: USER_ID }, JWT_SECRET)

global.console = { log: jest.fn(), error: jest.fn(), warn: jest.fn() }

const createTestClient = function () {
    const app = require('../../index')
    const client = defaults(request(app))

    client.set('Content-Type', 'application/json')
    return client
}

module.exports = { BEARER_TOKEN, PROMPT, PROVIDER, STATUS, USER_ID, createTestClient }
