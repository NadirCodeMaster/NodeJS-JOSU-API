const faker = require('faker')

const emails = require('../../../models/emails')
const profiles = require('../../../models/profiles')

jest.mock('../../../models/emails')
jest.mock('../../../models/profiles')

const { API_USERNAME, API_PASSWORD } = process.env
const { createTestClient } = require('../../tests/helpers')

describe('profiles', function () {
    beforeEach(() => faker.seed(1))

    test('createProfile() -> success', function (done) {
        profiles.insertProfile.mockResolvedValue({})
        return createTestClient()
            .post('/v0/profiles')
            .auth(API_USERNAME, API_PASSWORD)
            .send({ data: {
                profile_id: faker.random.uuid(),
                email: faker.internet.email(),
                emails: [faker.internet.email()],
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                names: [faker.fake('{{name.firstName}} {{name.lastName}}')],
            } })
            .expect(202)
            .end(done)
    })

    test('getProfile() -> success', function (done) {
        profiles.selectProfile.mockResolvedValue({})
        const profileId = faker.random.uuid()
        return createTestClient()
            .get(`/v0/profiles/${profileId}`)
            .auth(API_USERNAME, API_PASSWORD)
            .expect(200)
            .end(done)
    })

    test('getProfileEmail() -> success', function (done) {
        emails.selectEmail.mockResolvedValue({})
        profiles.selectProfile.mockResolvedValue({})

        const query = new URLSearchParams({ email: faker.internet.email() })
        return createTestClient()
            .get(`/v0/profiles?${query.toString()}`)
            .auth(API_USERNAME, API_PASSWORD)
            .expect(200)
            .end(done)
    })

    test('dropProfile() -> success', function (done) {
        emails.deleteEmail.mockResolvedValue({})
        profiles.deleteProfile.mockResolvedValue({})

        return createTestClient()
            .delete(`/v0/profiles/${faker.random.uuid()}`)
            .auth(API_USERNAME, API_PASSWORD)
            .send({ data: {
                profile_id: faker.random.uuid(),
                email: faker.internet.email(),
                emails: [faker.internet.email()],
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                names: [faker.fake('{{name.firstName}} {{name.lastName}}')],
            } })
            .expect(202)
            .end(done)
    })

    test('putProfileIdentity() -> success', function (done) {
        profiles.updateProfile.mockResolvedValue({})

        const profileId = faker.random.uuid()
        const email = faker.internet.email()
        const name = faker.fake('{{name.firstName}} {{name.lastName}}')

        return createTestClient()
            .put(`/v0/profiles/${profileId}/identity`)
            .auth(API_USERNAME, API_PASSWORD)
            .send({ data: {
                profile: {
                    profile_id: profileId,
                    email,
                    emails: [email],
                    name,
                    names: [name],
                },
                identity: { email, name, profile_id: profileId },
            } })
            .expect(202)
            .end(done)
    })

    test('dropProfileIdentity() -> success', function (done) {
        profiles.deleteProfile.mockResolvedValue({})

        const profileId = faker.random.uuid()
        const email = faker.internet.email()
        const name = faker.fake('{{name.firstName}} {{name.lastName}}')

        return createTestClient()
            .delete(`/v0/profiles/${profileId}/identity`)
            .auth(API_USERNAME, API_PASSWORD)
            .send({ data: {
                profile: {
                    profile_id: profileId,
                    email,
                    emails: [email],
                    name,
                    names: [name],
                },
                identity: { email, name, profile_id: profileId },
            } })
            .expect(202)
            .end(done)
    })
})
