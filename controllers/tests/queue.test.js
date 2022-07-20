const faker = require('faker')
const request = require('supertest')

const isAuthenticatedController = require('../../controllers/isAuthenticated')
const emailsQueue = require('../../models/emailsQueue')
const emotionsQueue = require('../../models/emotionsQueue')
const topicsQueue = require('../../models/topicsQueue')

jest.mock('../../models/recordings')
jest.mock('../../models/emailsQueue')
jest.mock('../../models/emotionsQueue')
jest.mock('../../models/topicsQueue')
isAuthenticatedController.isAuthenticated = jest.fn((req, res, next) => next())

const app = require('../../index')
const client = request(app)

describe.skip('queue', function () {
    test('createEmailsQueue() - success', async function () {
        emailsQueue.insertEmailsQueue.mockResolvedValue({})
        const response = await client.post('/v0/queue/emails')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                provider: faker.random.word(),
                account_id: faker.random.uuid(),
                speaker_id: faker.random.uuid(),
            }] })
        expect(response.status).toBe(201)
    })

    test('createEmotionsQueue() - success', async function () {
        emotionsQueue.insertEmotionsQueue.mockResolvedValue({})
        const response = await client.post('/v0/queue/emotions')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                provider: faker.random.word(),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                speaker_id: faker.random.uuid(),
            }] })
        expect(response.status).toBe(201)
    })

    test('createTopicsQueue() - success', async function () {
        topicsQueue.insertTopicsQueue.mockResolvedValue({})
        const response = await client.post('/v0/queue/topics')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                provider: faker.random.word(),
                account_id: faker.random.uuid(),
                speaker_id: faker.random.uuid(),
            }] })
        expect(response.status).toBe(201)
    })

    test('dropEmailsQueue() - success', async function () {
        emailsQueue.deleteEmailsQueue.mockResolvedValue({})
        const response = await client.delete('/v0/queue/emails')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                provider: faker.random.word(),
            }] })
        expect(response.status).toBe(204)
    })

    test('dropEmotionsQueue() - success', async function () {
        emotionsQueue.deleteEmotionsQueue.mockResolvedValue({})
        const response = await client.delete('/v0/queue/emotions')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                provider: faker.random.word(),
            }] })
        expect(response.status).toBe(204)
    })

    test('dropTopicsQueue() - success', async function () {
        topicsQueue.deleteTopicsQueue.mockResolvedValue({})
        const response = await client.delete('/v0/queue/topics')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                provider: faker.random.word(),
            }] })
        expect(response.status).toBe(204)
    })

    test('getEmailsQueue() - success', async function () {
        emailsQueue.selectEmailsQueue.mockResolvedValue({})
        const response = await client.get('/v0/queue/emails')
        expect(response.status).toBe(200)
    })

    test('getEmotionsQueue() - success', async function () {
        emotionsQueue.selectEmotionsQueue.mockResolvedValue({})
        const response = await client.get('/v0/queue/emotions')
        expect(response.status).toBe(200)
    })

    test('getTopicsQueue() - success', async function () {
        topicsQueue.selectTopicsQueue.mockResolvedValue({})
        const response = await client.get('/v0/queue/topics')
        expect(response.status).toBe(200)
    })
})
