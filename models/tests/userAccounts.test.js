const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertUserAccounts,
    selectUserAccounts,
    selectUserAccountsByUserId,
    updateUserAccount,
    updateUserAccountsIsActive,
    deleteUserAccount,
} = require('../userAccounts')

describe('userAccounts', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertUserAccounts() - success', async function () {
        const provider = faker.random.word()
        const id = faker.random.uuid()
        const userId = faker.random.uuid()
        const accountNickname = faker.internet.email()
        const created = faker.date.recent()
        const isActive = faker.random.boolean()
        const lastSync = faker.date.recent()
        const refreshToken = faker.random.alphaNumeric(32)

        const result = await insertUserAccounts(
            provider, id, userId, accountNickname, created, isActive, lastSync, refreshToken,
        )
        return expect(result).not.toBe(null)
    })

    test('selectUserAccounts() - success', async function () {
        const provider = faker.random.word()
        const result = await selectUserAccounts({ provider })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectUserAccountsByUserId() - success', async function () {
        const user_id = faker.random.uuid() // eslint-disable-line camelcase
        const provider = faker.random.word()
        const result = await selectUserAccountsByUserId({ user_id, provider })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserAccount() - success', async function () {
        const result = await updateUserAccount({
            provider: faker.random.word(),
            id: faker.random.uuid(),
            user_id: faker.random.uuid(),
            account_nickname: faker.internet.email(),
            created: faker.date.recent(),
            is_active: faker.random.boolean(),
            last_sync: faker.date.recent(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserAccountIsActive() - success', async function () {
        const isActive = faker.random.boolean()
        const provider = faker.random.word()
        const id = faker.random.uuid()
        const userId = faker.random.uuid()

        const result = await updateUserAccountsIsActive(provider, id, userId, isActive)
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteUserAccount() - success', async function () {
        const id = faker.random.uuid()
        const userId = faker.random.uuid()
        const provider = faker.random.word()

        const result = await deleteUserAccount(id, userId, provider)
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
