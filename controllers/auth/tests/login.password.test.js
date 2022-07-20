const bcrypt = require('bcrypt')
const faker = require('faker')
const request = require('supertest')

const users = require('../../../models/users')
jest.mock('../../../models/users')

const app = require('../../../index')
const client = request(app)

require('../../tests/helpers')

describe('auth', function () {
    beforeEach(() => faker.seed(1))

    test('loginPassword() -> success', async function () {
        const username = faker.random.alphaNumeric(16)
        const password = faker.random.alphaNumeric(16)
        users.selectUser.mockResolvedValue({ rows: [{
            username,
            password: bcrypt.hashSync(password, 12),
        }] })

        const response = await client
            .post('/v0/auth/login/password')
            .send({ data: {
                password,
                user_id: faker.random.uuid(),
                username,
            } })
        return expect(response.status).toBe(202)
    })

    test('loginPassword() -> failure', async function () {
        users.selectUser.mockResolvedValue({ rows: [{
            username: faker.random.alphaNumeric(16),
            password: faker.random.alphaNumeric(16),
        }] })

        const response = await client
            .post('/v0/auth/login/password')
            .send({ data: {
                password: faker.random.alphaNumeric(16),
                user_id: faker.random.uuid(),
                username: faker.random.alphaNumeric(16),
            } })
        return expect(response.status).toBe(401)
    })
})
