const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { insertResetToken, selectResetToken, deleteResetToken } = require('../resetTokens')

require('./helpers')

describe('users', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertResetToken() - success', async function () {
        const result = await insertResetToken({
            reset_token: faker.random.uuid(),
            base_uri: faker.internet.url(),
            user_id: faker.random.uuid(),
            valid_until: faker.date.future(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectResetToken() - success', async function () {
        const result = await selectResetToken({
            reset_token: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteResetToken() - success', async function () {
        const result = await deleteResetToken({
            reset_token: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
