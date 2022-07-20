const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { insertUserLegacy, selectUserLegacy, updateUserLegacy } = require('../usersLegacy')

describe('users', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertUser() - success', async function () {
        const email = faker.internet.email()
        const password = faker.random.alphaNumeric(36)
        const id = faker.random.uuid()
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()

        const result = await insertUserLegacy(email, password, id, firstName, lastName)
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectUser() - success', async function () {
        const email = faker.internet.email()
        const result = await selectUserLegacy(email)
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUser() - success', async function () {
        const email = faker.internet.email()
        const password = faker.random.alphaNumeric(36)
        const id = faker.random.uuid()

        const result = await updateUserLegacy(email, password, id)
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
