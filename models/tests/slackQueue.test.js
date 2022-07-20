const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { insertQueue, deleteQueue } = require('../slackQueue')

describe('slackQueue', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertQueue() - success', async function () {
        const result = await insertQueue({
            id: faker.random.uuid(),
            text: faker.lorem.sentence(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteQueue() - success', async function () {
        const result = await deleteQueue({
            id: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
