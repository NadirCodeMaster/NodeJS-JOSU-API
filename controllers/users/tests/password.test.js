const bcrypt = require('bcrypt')
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

    test('putUserPassword() -> success', async function () {
        const newPassword = faker.random.alphaNumeric(16)
        const oldPassword = faker.random.alphaNumeric(16)
        const user = {
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
            password: bcrypt.hashSync(oldPassword, 12),
            profile_id: faker.random.uuid(),
            username: faker.random.alphaNumeric(16),
            userpic_url: faker.image.imageUrl(),
        }

        users.selectUser.mockResolvedValue({ rows: [user] })
        users.updateUserPassword.mockResolvedValue({ rows: [user] })

        const response = await client
            .put(`/v0/users/${USER_ID}/password`)
            .auth(BEARER_TOKEN, { type: 'bearer' })
            .send({ data: {
                password: {
                    new_password: newPassword,
                    new_password_confirm: newPassword,
                    old_password: oldPassword,
                },
                user,
            } })
        return expect(response.status).toBe(202)
    })
})
