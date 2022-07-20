const request = require('supertest')
require('../../tests/helpers')

const accounts = require('../../../models/accounts')
jest.mock('../../../models/accounts')

const app = require('../../../index')
const client = request(app)

describe('auth', function () {
    afterAll(() => client.close())

    test('lookupAccount() -> success', async function () {
        accounts.selectAccount.mockResolvedValue({})

        const response = await client
            .get('/v0/auth/lookup/account_/account')
        return expect(response.status).toBe(200)
    })
})
