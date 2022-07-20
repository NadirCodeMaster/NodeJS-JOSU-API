const faker = require('faker')

const { cassandraCursor, readOptions } = require('../../helpers/cassandra')
const { deleteEmailsQueue, insertEmailsQueue, selectEmailsQueue } = require('../emailsQueue')

describe('emailsQueue', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertEmailsQueue() - success', async function () {
        const result = await insertEmailsQueue({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            provider: faker.random.word(),
            account_id: faker.random.uuid(),
            speaker_id: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectEmailsQueue() - success', async function () {
        const result = await selectEmailsQueue(readOptions)
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteEmailsQueue() - success', async function () {
        const result = await deleteEmailsQueue({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            provider: faker.random.word(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
