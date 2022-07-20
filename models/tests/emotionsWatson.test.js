const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { insertEmotionWatson, selectEmotionsWatsonByUser } = require('../emotionsWatson')

describe('emotionsWatson', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertEmotionWatson() - success', async function () {
        const result = await insertEmotionWatson({
            user_id: faker.random.uuid(),
            provider: faker.random.alphaNumeric(12),
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
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectEmotionsWatsonByUser() - success', async function () {
        const result = await selectEmotionsWatsonByUser({
            user_id: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
