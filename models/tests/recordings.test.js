const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { selectRecordingsByProcessed, selectRecordingsByUser } = require('../recordings')

describe('recordings', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('selectRecordingsByProcessed() - success', async function () {
        const processedBy = faker.random.alphaNumeric(12)
        const userId = faker.random.uuid()
        const result = await selectRecordingsByProcessed(processedBy, userId)
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectRecordingsByUser() - success', async function () {
        const userId = faker.random.uuid()
        const result = await selectRecordingsByUser(userId)
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
