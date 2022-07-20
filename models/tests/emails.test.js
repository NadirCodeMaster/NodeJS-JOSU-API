const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { selectEmail, deleteEmail } = require('../emails')

require('./helpers')

describe('emails', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('selectEmail() - success', async function () {
        const result = await selectEmail({
            email: faker.internet.email(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteEmail() - success', async function () {
        const result = await deleteEmail({
            email: faker.internet.email(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
