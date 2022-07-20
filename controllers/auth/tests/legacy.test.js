const defaults = require('superagent-defaults')
const request = require('supertest')

const users = require('../../../models/usersLegacy')

const SELECT_USER_FAILURE = {}
const SELECT_USER_SUCCESS = { rows: [{
    id: '05529a8f-32f7-4d57-bf67-28d371cfbb46',
    email: 'test@test.test',
    password: '$2b$10$qu1nsotD40Ih.cb19ubCZu0Csacj2ZImKmx/M62niE.4lPlkT1KVK',
}] }
const INSERT_USER_SUCCESS = {}

jest.mock('../../../models/usersLegacy')

const app = require('../../../index')
const client = defaults(request(app))

client.set('Content-Type', 'application/json')

describe.skip('/auth', function () {
    test.skip('login with correct creds - success', async function () {
        users.selectUser.mockResolvedValue(SELECT_USER_SUCCESS)
        const response = await client.post('/v0/auth/login')
            .send({ email: 'test@test.test', password: 'test' })

        expect(response.body.data?.id).toBe('05529a8f-32f7-4d57-bf67-28d371cfbb46')
    })

    test.skip('login with bogus email - failure', async function () {
        users.selectUser.mockResolvedValue(SELECT_USER_FAILURE)
        const response = await client.post('/v0/auth/login')
            .send({ email: 'fake@fake.fake', password: 'fake' })

        expect(response.body?.errors[0].status).toBe('500')
    })

    test.skip('login with bogus password - failure', async function () {
        users.selectUser.mockResolvedValue(SELECT_USER_SUCCESS)
        const response = await client.post('/v0/auth/login')
            .send({ email: 'test@test.test', password: 'fake' })

        expect(response.body?.errors[0].status).toBe('401')
    })

    test.skip('register new user with correct creds - success', async function () {
        users.selectUser.mockResolvedValue(SELECT_USER_FAILURE)
        users.insertUser.mockResolvedValue(INSERT_USER_SUCCESS)
        const response = await client.post('/v0/auth/register')
            .send({ email: 'test@test.test', password: 'test' })

        expect(response.body.data).toHaveProperty('userId')
    })

    test.skip('register new user with existing email - failure', async function () {
        users.selectUser.mockResolvedValue(SELECT_USER_SUCCESS)
        const response = await client.post('/v0/auth/register')
            .send({ email: 'test@test.test', password: 'test' })

        expect(response.status).toBe(400)
    })

    test.skip('reset password with correct username - success', async function () {
        users.selectUser.mockResolvedValue(SELECT_USER_SUCCESS)
        const response = await client.post('/v0/auth/forgotpassword')
            .send({ email: 'test@test.test', password: 'test' })

        expect(response.body.data.userEmail).toBe('test@test.test')
    })

    test.skip('reset password with bogus username - failure', async function () {
        users.selectUser.mockResolvedValue(SELECT_USER_FAILURE)
        const response = await client.post('/v0/auth/forgotpassword')
            .send({ email: 'fake@fake.fake', password: 'fake' })

        expect(response.status).toBe(500)
    })
})
