const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { selectUsername } = require('../usernames')

require('./helpers')

describe('users', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('selectUsername() -> success', async function () {
        const result = await selectUsername({
            username: faker.random.alphaNumeric(16),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
