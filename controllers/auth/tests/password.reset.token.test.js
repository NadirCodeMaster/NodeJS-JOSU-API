const faker = require('faker')

const resetTokens = require('../../../models/resetTokens')
jest.mock('../../../models/resetTokens')

const { createTestClient } = require('../../tests/helpers')

describe('auth', function () {
    test('passwordResetToken() -> failure', function (done) {
        resetTokens.selectResetToken.mockResolvedValue({})
        return createTestClient()
            .get(`/v0/auth/password/reset/${faker.random.uuid()}`)
            .expect(400)
            .end(done)
    })
})
