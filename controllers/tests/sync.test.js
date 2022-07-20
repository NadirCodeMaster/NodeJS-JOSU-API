const faker = require('faker')
const request = require('supertest')

const userAccounts = require('../../models/userAccounts')
const isAuthenticatedController = require('../../controllers/isAuthenticated')

jest.mock('../../models/userAccounts')
isAuthenticatedController.isAuthenticated = jest.fn((req, res, next) => next())

const app = require('../../index')
const client = request(app)

describe.skip('sync', function () {
    test('setAccount() - success', async function () {
        userAccounts.updateUserAccount.mockResolvedValue({})
        const response = await client.put('/v0/sync/gmail/44444444-4444-4444-4444-444444444444')
            .send({ data: {
                provider: faker.random.word(),
                id: faker.random.uuid(),
                user_id: faker.random.uuid(),
                account_nickname: faker.internet.email(),
                created: faker.date.recent(),
                is_active: faker.random.boolean(),
                last_sync: faker.date.recent(),
            } })
        expect(response.status).toBe(204)
    })

    test.skip('get gmail creds - failure', async function () {
        userAccounts.selectUserAccounts.mockResolvedValue({})
        const response = await client.get('/v0/sync/email/test')
        return expect(response.body?.errors[0].status).toBe('500')
    })

    test.skip('post gmail creds - success', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/email')
            .send({ accountNickname: 'test', authToken: 'test' })
        return expect(response.status).toBe(201)
    })

    test.skip('post gmail creds with missing fields - failure', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/email')
        return expect(response.body?.errors[0].status).toBe('422')
    })

    test.skip('post gmail creds with missing fields - failure', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/email')
            .send({ accountNickname: 'fake', authToken: 'fake' })
        return expect(response.body?.errors[0].status).toBe('500')
    })

    test.skip('get slack creds - success', async function () {
        userAccounts.selectUserAccountsByUserId.mockResolvedValue({})
        const response = await client.get('/v0/sync/slack')
        return expect(response.body?.data[0].id).toBe('05529a8f-32f7-4d57-bf67-28d371cfbb46')
    })

    test.skip('get slack creds - failure', async function () {
        userAccounts.selectUserAccountsByUserId.mockResolvedValue({})
        const response = await client.get('/v0/sync/slack')
        return expect(response.body?.errors[0].status).toBe('500')
    })

    test.skip('post slack creds - success', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/slack')
            .send({ accountNickname: 'test', authToken: 'test' })
        return expect(response.status).toBe(201)
    })

    test.skip('post slack creds with missing fields - failure', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/slack')
        return expect(response.body?.errors[0].status).toBe('422')
    })

    test.skip('post slack creds with missing fields - failure', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/slack')
            .send({ accountNickname: 'fake', authToken: 'fake' })
        return expect(response.body?.errors[0].status).toBe('500')
    })

    test.skip('get zoom creds - success', async function () {
        userAccounts.selectUserAccountsByUserId.mockResolvedValue({})
        const response = await client.get('/v0/sync/zoom')
        return expect(response.body?.data[0].id).toBe('05529a8f-32f7-4d57-bf67-28d371cfbb46')
    })

    test.skip('get zoom creds - failure', async function () {
        userAccounts.selectUserAccountsByUserId.mockResolvedValue({})
        const response = await client.get('/v0/sync/zoom')
        return expect(response.body?.errors[0].status).toBe('500')
    })

    test.skip('post zoom creds - success', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/zoom')
            .send({ accountNickname: 'test', authToken: 'test' })
        return expect(response.status).toBe(201)
    })

    test.skip('post zoom creds with missing fields - failure', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/zoom')
        return expect(response.body?.errors[0].status).toBe('422')
    })

    test.skip('post zoom creds with missing fields - failure', async function () {
        userAccounts.insertUserAccounts.mockResolvedValue({})
        const response = await client.post('/v0/sync/zoom')
            .send({ accountNickname: 'fake', authToken: 'fake' })
        return expect(response.body?.errors[0].status).toBe('500')
    })
})
