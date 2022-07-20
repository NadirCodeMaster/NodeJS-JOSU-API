const faker = require('faker')

const users = require('../../../models/users')
jest.mock('../../../models/users')

const { createTestClient } = require('../../tests/helpers')

describe('auth', function () {
    beforeEach(() => faker.seed(1))

    test('passwordReset() -> failure', function (done) {
        users.selectUser.mockResolvedValue({})
        return createTestClient()
            .post('/v0/auth/password/reset')
            .send({ data: { user_id: faker.random.uuid() } })
            .expect(400)
            .end(done)
    })
})
