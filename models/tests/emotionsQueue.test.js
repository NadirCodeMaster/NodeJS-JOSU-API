const faker = require('faker')

const { cassandraCursor, readOptions } = require('../../helpers/cassandra')
const {
    deleteEmotionsQueue, insertEmotionsQueue, selectEmotionsQueue,
} = require('../emotionsQueue')

describe('emotionsQueue', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertEmotionsQueue() - success', async function () {
        const result = await insertEmotionsQueue({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            provider: faker.random.word(),
            account_id: faker.random.uuid(),
            speaker_id: faker.random.uuid(),
            text: faker.random.words(12),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectEmotionsQueue() - success', async function () {
        const result = await selectEmotionsQueue(readOptions)
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteEmotionsQueue() - success', async function () {
        const result = await deleteEmotionsQueue({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            provider: faker.random.word(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
