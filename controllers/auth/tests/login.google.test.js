const faker = require('faker')
const request = require('supertest')

const connections = require('../../../helpers/connections')
const oauth = require('../../../helpers/oauth')
const users = require('../../../models/accounts')

jest.mock('../../../helpers/connections')
jest.mock('../../../helpers/oauth')
jest.mock('../../../models/accounts')

const app = require('../../../index')
const client = request(app)

const { PROMPT } = require('../../tests/helpers')

describe('auth', function () {
    beforeEach(() => faker.seed(1))
    afterAll(() => client.close())

    test('loginGoogle() -> failure', async function () {
        oauth.fetchAccessToken.mockResolvedValue({})
        connections.queryJsonApi.mockResolvedValue({})
        users.selectAccount.mockResolvedValue({})

        const response = await client
            .get('/v0/auth/login/google/web')
            .query({
                code: faker.random.alphaNumeric(64),
                hd: faker.internet.domainName(),
                prompt: faker.random.arrayElement(PROMPT),
                redirect_uri: faker.internet.url(),
                scope: faker.internet.url(),
                authuser: faker.random.number({ min: 1, max: 2 }),
            })
        return expect(response.status).toBe(400)
    })
})
