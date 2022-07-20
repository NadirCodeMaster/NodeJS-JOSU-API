const faker = require('faker')

const connections = require('../../../helpers/connections')
const oauth = require('../../../helpers/oauth')
const users = require('../../../models/accounts')

jest.mock('../../../helpers/connections')
jest.mock('../../../helpers/oauth')
jest.mock('../../../models/accounts')

const { createTestClient } = require('../../tests/helpers')

describe('auth', function () {
    beforeEach(() => faker.seed(1))

    test('loginMicrosoft() -> failure', function (done) {
        oauth.fetchAccessToken.mockResolvedValue({})
        connections.queryJsonApi.mockResolvedValue({})
        users.selectAccount.mockResolvedValue({})

        return createTestClient()
            .get('/v0/auth/login/microsoft/web')
            .query({
                code: faker.random.alphaNumeric(64),
                session_state: faker.random.alphaNumeric(64),
            })
            .expect(500)
            .end(done)
    })
})
