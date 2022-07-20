const request = require('supertest')
require('../../tests/helpers')

const usernames = require('../../../models/usernames')
jest.mock('../../../models/usernames')

const app = require('../../../index')
const client = request(app)

describe('auth', function () {
    afterAll(() => client.close())

    test('lookupUsername() -> success', async function () {
        usernames.selectUsername.mockResolvedValue({})

        const response = await client
            .get('/v0/auth/lookup/username/username')
        return expect(response.status).toBe(200)
    })
})
