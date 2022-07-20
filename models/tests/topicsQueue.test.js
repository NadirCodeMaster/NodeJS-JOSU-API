const faker = require('faker')

const { cassandraCursor, readOptions } = require('../../helpers/cassandra')
const { deleteTopicsQueue, insertTopicsQueue, selectTopicsQueue } = require('../topicsQueue')

describe('topicsQueue', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertTopicQueue() - success', async function () {
        const result = await insertTopicsQueue({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            provider: faker.random.word(),
            account_id: faker.random.uuid(),
            speaker_id: faker.random.uuid(),
            text: faker.random.words(12),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectTopicsQueue() - success', async function () {
        const result = await selectTopicsQueue(readOptions)
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteTopicQueue() - success', async function () {
        const result = await deleteTopicsQueue({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            provider: faker.random.word(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
