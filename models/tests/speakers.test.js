const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { insertSpeaker, selectSpeaker } = require('../speakers')

describe('speakers', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertSpeaker() - success', async function () {
        const result = await insertSpeaker({
            provider: faker.random.alphaNumeric(6),
            account_nickname: faker.random.alphaNumeric(12),
            id: faker.random.uuid(),
            created: faker.date.recent(),
            description: faker.lorem.sentence(),
            first_name: faker.name.firstName(),
            is_deleted: faker.random.boolean(),
            last_name: faker.name.lastName(),
            photo_url: faker.image.imageUrl(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectSpeaker() - success', async function () {
        const result = await selectSpeaker({
            provider: faker.random.alphaNumeric(6),
            account_nickname: faker.random.alphaNumeric(12),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
