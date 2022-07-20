const request = require('supertest')

const app = require('../../../index')
const client = request(app)

require('../../tests/helpers')

describe('auth', function () {
    afterAll(() => client.close())

    test('logout() -> success', async function () {
        const response = await client.post('/v0/auth/logout')
        expect(response.status).toBe(202)
    })
})
