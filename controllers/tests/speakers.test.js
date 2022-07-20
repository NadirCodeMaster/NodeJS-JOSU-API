const defaults = require('superagent-defaults')
const faker = require('faker')
const request = require('supertest')

const isAuthenticatedController = require('../isAuthenticated')
const speakers = require('../../models/speakers')
jest.mock('../../models/speakers')

jest.mock('../../models/userAccounts')
isAuthenticatedController.isAuthenticated = jest.fn((req, res, next) => next())

const DATA = {}
const SUCCESS = { rows: DATA }

const app = require('../../index')
const client = defaults(request(app))

client.set('Content-Type', 'application/json')

describe.skip('/speakers', function () {
    test('Insert new speaker - success', async function () {
        speakers.insertSpeaker.mockResolvedValue(SUCCESS)
        const response = await client.post('/v0/speakers').send({
            provider: faker.random.alphaNumeric(6),
            account_nickname: faker.random.alphaNumeric(12),
            id: faker.random.uuid(),
            created: faker.date.recent(),
            description: faker.lorem.sentence(),
            first_name: faker.name.firstName(),
            is_deleted: faker.random.boolean(),
            last_name: faker.name.lastName(),
            photo_url: faker.image.imageUrl(),
        })
        expect(response.status).toBe(201)
    })

    test.skip('Get speaker by provider and account_nickname  - success', async function () {
        speakers.selectSpeaker.mockResolvedValue(SUCCESS)
        const provider = faker.random.alphaNumeric(6)
        const accountNickname = faker.random.alphaNumeric(12)
        const response = await client.get(`/v0/speakers/${provider}/${accountNickname}`)
        expect(response.status).toBe(404)
    })
})
