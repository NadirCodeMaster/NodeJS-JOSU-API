const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertUser,
    selectUser,
    selectUsers,
    updateUser,
    updateUserAccount,
    updateUserAutojoin,
    updateUserCalendar,
    updateUserDevices,
    updateUserPassword,
    updateUserUsername,
    deleteUser,
    deleteUserAccount,
} = require('../users')

const { PROVIDER, USER_ID } = require('./helpers')

describe('users', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertUser() -> success', async function () {
        const account = {
            id: faker.random.alphaNumeric(16),
            autojoin_zoom: faker.random.boolean(),
            email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            name: faker.fake('{{name.firstName}} {{name.lastName}}'),
            provider: faker.random.arrayElement(PROVIDER),
            refresh_token: faker.random.alphaNumeric(256),
        }
        const calendar = {
            id: faker.random.alphaNumeric(16),
            account: faker.internet.email(),
            channel: faker.random.alphaNumeric(32),
            expires: faker.date.future(),
            provider: faker.random.arrayElement(PROVIDER),
            refresh_token: faker.random.alphaNumeric(256),
        }
        const result = await insertUser(
            {
                user_id: USER_ID,
                __accounts_google: { [account.id]: account },
                __accounts_microsoft: { [account.id]: account },
                __calendars_google: { [calendar.id]: calendar },
                __calendars_microsoft: { [calendar.id]: calendar },
                autojoin_zoom: faker.random.boolean(),
                devices: [faker.random.uuid()],
                email: faker.internet.email(),
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                password: faker.random.alphaNumeric(16),
                profile_id: faker.random.uuid(),
                username: faker.random.alphaNumeric(16),
                userpic_url: faker.image.imageUrl(),
            },
            {
                account: account.id,
                user_id: USER_ID,
            },
        )
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectUser() -> success', async function () {
        const result = await selectUser({
            user_id: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectUsers() -> success', async function () {
        const result = await selectUsers({})
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUser() -> success', async function () {
        const account = {
            id: faker.random.alphaNumeric(16),
            autojoin_zoom: faker.random.boolean(),
            email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            name: faker.fake('{{name.firstName}} {{name.lastName}}'),
            provider: faker.random.arrayElement(PROVIDER),
            refresh_token: faker.random.alphaNumeric(256),
        }
        const calendar = {
            id: faker.random.alphaNumeric(16),
            account: faker.internet.email(),
            channel: faker.random.alphaNumeric(32),
            expires: faker.date.future(),
            provider: faker.random.arrayElement(PROVIDER),
            refresh_token: faker.random.alphaNumeric(256),
        }
        const result = await updateUser({
            user_id: USER_ID,
            __accounts_google: { [account.id]: account },
            __accounts_microsoft: { [account.id]: account },
            __calendars_google: { [calendar.id]: calendar },
            __calendars_microsoft: { [calendar.id]: calendar },
            autojoin_zoom: faker.random.boolean(),
            devices: [faker.random.uuid()],
            email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            password: faker.random.alphaNumeric(16),
            profile_id: faker.random.uuid(),
            username: faker.random.alphaNumeric(16),
            userpic_url: faker.image.imageUrl(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserAccount() -> success', async function () {
        const account = {
            id: faker.random.alphaNumeric(16),
            autojoin_zoom: faker.random.boolean(),
            email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            name: faker.fake('{{name.firstName}} {{name.lastName}}'),
            provider: faker.random.arrayElement(PROVIDER),
            refresh_token: faker.random.alphaNumeric(256),
        }
        const result = await updateUserAccount(
            {
                user_id: USER_ID,
                __accounts_google: { [account.id]: account },
                __accounts_microsoft: { [account.id]: account },
            },
            {
                account: account.id,
                user_id: USER_ID,
            },
        )
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserAutojoin() -> success', async function () {
        const result = await updateUserAutojoin({
            user_id: USER_ID,
            autojoin_zoom: faker.random.boolean(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserCalendar() -> success', async function () {
        const calendar = {
            id: faker.random.alphaNumeric(16),
            account: faker.internet.email(),
            channel: faker.random.alphaNumeric(32),
            expires: faker.date.future(),
            provider: faker.random.arrayElement(PROVIDER),
            refresh_token: faker.random.alphaNumeric(256),
        }
        const result = await updateUserCalendar({
            user_id: USER_ID,
            __calendars_google: { [calendar.id]: calendar },
            __calendars_microsoft: { [calendar.id]: calendar },
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserDevices() -> success', async function () {
        const result = await updateUserDevices({
            user_id: USER_ID,
            devices: [faker.random.uuid()],
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserPassword() -> success', async function () {
        const result = await updateUserPassword({
            user_id: USER_ID,
            password: faker.random.alphaNumeric(16),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserUsername() :: existing username -> success', async function () {
        const username = faker.random.alphaNumeric(16)
        const result = await updateUserUsername(
            { user_id: USER_ID, username: username },
            { user_id: USER_ID, username: username },
        )
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateUserUsername() :: no existing username -> success', async function () {
        const username = faker.random.alphaNumeric(16)
        const result = await updateUserUsername(
            { user_id: USER_ID, username: username },
            { user_id: USER_ID, username: null },
        )
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteUser() -> success', async function () {
        const result = await deleteUser({
            user_id: USER_ID,
            username: faker.random.alphaNumeric(16),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteUserAccount() -> success', async function () {
        const result = await deleteUserAccount(
            {
                user_id: USER_ID,
                __accounts_google: {},
                __accounts_microsoft: {},
            },
            {
                account: faker.random.alphaNumeric(16),
            },
        )
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
