const faker = require('faker')

const connections = require('../../../helpers/connections')
const oauth = require('../../../helpers/oauth')

jest.mock('../../../helpers/connections')
jest.mock('../../../helpers/oauth')

const { createTestClient } = require('../../tests/helpers')

describe('auth', function () {
    beforeEach(() => faker.seed(1))

    test('connectMicrosoft() -> failure', function (done) {
        oauth.fetchAccessToken.mockResolvedValue({})
        connections.queryJsonApi.mockResolvedValue({})
        return createTestClient()
            .get('/v0/auth/connect/microsoft/web')
            .query({
                code: faker.random.alphaNumeric(64),
                state: faker.random.alphaNumeric(128),
            })
            .expect(500)
            .end(done)
    })
})
