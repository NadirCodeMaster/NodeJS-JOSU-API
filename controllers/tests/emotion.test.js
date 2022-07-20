const faker = require('faker')
const request = require('supertest')

const isAuthenticatedController = require('../../controllers/isAuthenticated')
const emotionsWatson = require('../../models/emotionsWatson')

jest.mock('../../models/emotionsWatson')
isAuthenticatedController.isAuthenticated = jest.fn((req, res, next) => next())

const app = require('../../index')
const client = request(app)

describe.skip('emotion', function () {
    test('createEmotions()', async function () {
        emotionsWatson.insertEmotionWatson.mockResolvedValue({})
        const response = await client.post('/v0/emotion/watson')
            .send({ data: {
                user_id: faker.random.uuid(),
                provider: faker.random.word(),
                id: faker.random.alphaNumeric(12),
                account_id: faker.random.uuid(),
                document_tone_ids: [faker.random.word()],
                document_tone_names: [faker.random.word()],
                document_tone_scores: [Math.random()],
                sentences_id: [faker.random.number()],
                sentences: [faker.random.words(6)],
                sentences_score: [JSON.stringify([faker.random.word()])],
                sentences_tone_id: [JSON.stringify([faker.random.word()])],
                sentences_tone_name: [JSON.stringify([faker.random.word()])],
                speaker_id: faker.random.uuid(),
            } })
        expect(response.status).toBe(201)
    })

    test('getEmotions()', async function () {
        emotionsWatson.selectEmotionsWatsonByUser.mockResolvedValue({})
        const response = await client.get('/v0/emotion/watson/test')
        expect(response.status).toBe(200)
    })

    test.skip('get emotion by topic - success', async function () {
        // TODO implement
        const response = await client.get('/v0/emotion/topic/test')
        return expect(response.status).toBe(501)
    })

    test.skip('get emotion by speaker - success', async function () {
        // TODO implement
        const response = await client.get('/v0/emotion/speaker/test')
        return expect(response.status).toBe(501)
    })
})
