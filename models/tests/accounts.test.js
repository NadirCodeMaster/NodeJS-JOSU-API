const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { selectAccount } = require('../accounts')

require('./helpers')

describe('users', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('selectAccount() -> success', async function () {
        const result = await selectAccount({
            account: faker.random.alphaNumeric(16),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
