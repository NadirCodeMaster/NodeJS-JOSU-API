const faker = require('faker')
const request = require('supertest')

const { BEARER_TOKEN, PROVIDER, USER_ID } = require('../../tests/helpers')

const users = require('../../../models/users')
jest.mock('../../../models/users')

const app = require('../../../index')
const client = request(app)

describe('users', function () {
    beforeEach(() => faker.seed(1))
    afterAll(() => client.close())

    test('putUserAutojoin() -> success', async function () {
        users.updateUserAutojoin.mockResolvedValue({})
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
        const response = await client
            .put(`/v0/users/${USER_ID}/autojoin`)
            .auth(BEARER_TOKEN, { type: 'bearer' })
            .send({ data: {
                account: account,
                autojoin_zoom: faker.random.boolean(),
                user: {
                    user_id: USER_ID,
                    __accounts_google: { [account.id]: account },
                    __accounts_microsoft: { [account.id]: account },
                    __calendars_google: {},
                    __calendars_microsoft: {},
                    autojoin_zoom: faker.random.boolean(),
                    devices: [faker.random.uuid()],
                    email: faker.internet.email(),
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    password: faker.random.alphaNumeric(64),
                    profile_id: faker.random.uuid(),
                    username: faker.random.alphaNumeric(16),
                    userpic_url: faker.image.imageUrl(),
                },
            } })
        return expect(response.status).toBe(202)
    })
})
