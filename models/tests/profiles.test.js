const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertProfile,
    selectProfile,
    updateProfile,
    deleteProfile,
} = require('../profiles')

require('./helpers')

describe('profiles', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertProfile() -> success', async function () {
        const email = faker.internet.email()
        const name = faker.fake('{{name.firstName}} {{name.lastName}}')
        const profileId = faker.random.uuid()

        const result = await insertProfile(
            {
                profile_id: profileId,
                email,
                emails: [email],
                name,
                names: [name],
                user_id: faker.random.uuid(),
                userpic_url: faker.internet.url(),
            },
            { email, profile_id: profileId },
            { name, email, profile_id: profileId },
        )
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectProfile() -> success', async function () {
        const result = await selectProfile({
            profile_id: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateProfile() -> success', async function () {
        const email = faker.internet.email()
        const name = faker.fake('{{name.firstName}} {{name.lastName}}')
        const profileId = faker.random.uuid()

        const result = await updateProfile(
            {
                profile_id: profileId,
                email,
                emails: [email],
                name,
                names: [name],
                user_id: faker.random.uuid(),
                userpic_url: faker.internet.url(),
            },
            { name, email, profile_id: profileId },
        )
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteProfile() -> success', async function () {
        const email = faker.internet.email()
        const name = faker.fake('{{name.firstName}} {{name.lastName}}')
        const profileId = faker.random.uuid()

        const result = await deleteProfile(
            { profile_id: profileId },
            { name, email },
        )
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
