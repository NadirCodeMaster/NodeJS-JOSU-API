const faker = require('faker')
const request = require('supertest')

const { BEARER_TOKEN, PROVIDER, USER_ID } = require('../../tests/helpers')

const pipelines = require('../pipelines')
const users = require('../../../models/users')

jest.mock('../pipelines')
jest.mock('../../../models/users')

const app = require('../../../index')
const client = request(app)

describe('users', function () {
    beforeEach(() => faker.seed(1))
    afterAll(() => client.close())

    test('dropUserProfile() -> success', async function () {
        pipelines.deleteAccountData.mockResolvedValue({})
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
        const calendar = {
            id: faker.random.alphaNumeric(16),
            account: faker.internet.email(),
            channel: faker.random.alphaNumeric(32),
            expires: faker.date.future(),
            provider: faker.random.arrayElement(PROVIDER),
            refresh_token: faker.random.alphaNumeric(256),
        }
        const user = {
            user_id: USER_ID,
            __accounts_google: { [account.id]: account },
            __accounts_microsoft: { [account.id]: account },
            __calendars_google: { [calendar.id]: calendar },
            __calendars_microsoft: { [calendar.id]: calendar },
            autojoin_zoom: faker.random.boolean(),
            devices: [faker.random.uuid()],
            email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            password: faker.random.alphaNumeric(16),
            profile_id: faker.random.uuid(),
            username: faker.random.alphaNumeric(16),
            userpic_url: faker.image.imageUrl(),
        }
        users.selectUser.mockResolvedValue({ rows: [user] })
        users.deleteUser.mockResolvedValue({})
        const response = await client
            .delete(`/v0/users/${USER_ID}/profile`)
            .auth(BEARER_TOKEN, { type: 'bearer' })
        return expect(response.status).toBe(202)
    })
})
