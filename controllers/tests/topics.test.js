const faker = require('faker')
const request = require('supertest')

const isAuthenticatedController = require('../../controllers/isAuthenticated')
const topics = require('../../models/topics')

jest.mock('../../models/topics')
isAuthenticatedController.isAuthenticated = jest.fn((req, res, next) => next())

const app = require('../../index')
const client = request(app)

describe.skip('topics', function () {
    test('createTopics() - success', async function () {
        topics.insertTopic.mockResolvedValue({})
        const response = await client.post('/v0/topics')
            .send({ data: {
                user_id: faker.random.uuid(),
                provider: faker.random.word(),
                id: faker.random.alphaNumeric(12),
                account_id: faker.random.uuid(),
                created: faker.date.recent(),
                end_time: faker.date.recent(),
                kind: faker.random.word(),
                speaker_id: faker.random.uuid(),
                start_time: faker.date.recent(),
                topic: faker.random.word(),
                type: faker.random.word(),
                weight: Math.random(),
            } })
        expect(response.status).toBe(201)
    })

    test('getTopics() - success', async function () {
        topics.selectTopicByUser.mockResolvedValue({})
        const response = await client.get('/v0/topics/test')
        expect(response.status).toBe(200)
    })
})
