const faker = require('faker')
const request = require('supertest')

const { BEARER_TOKEN, USER_ID } = require('../../tests/helpers')

const users = require('../../../models/users')
jest.mock('../../../models/users')

const app = require('../../../index')
const client = request(app)

describe('users', function () {
    beforeEach(() => faker.seed(1))
    afterAll(() => client.close())

    test('putUserUsername() -> success', async function () {
        users.selectUser.mockResolvedValue({})
        const response = await client
            .put(`/v0/users/${USER_ID}/username`)
            .auth(BEARER_TOKEN, { type: 'bearer' })
            .send({ data: {
                new_username: faker.random.alphaNumeric(16),
                user: {
                    user_id: USER_ID,
                    __accounts_google: {},
                    __accounts_microsoft: {},
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
