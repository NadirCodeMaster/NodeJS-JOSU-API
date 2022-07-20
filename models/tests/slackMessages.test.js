const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { insertMessage } = require('../slackMessages')

describe('slackMessages', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertMessage() - success', async function () {
        const result = await insertMessage({
            id: faker.random.uuid(),
            author: faker.random.alphaNumeric(12),
            channel: faker.random.alphaNumeric(12),
            created: faker.date.recent(),
            edited: faker.date.recent(),
            is_edited: faker.random.boolean(),
            latest_reply: faker.date.recent(),
            reactions: [faker.lorem.word()],
            reply_count: faker.random.number(),
            reply_users: [faker.random.alphaNumeric(12)],
            reply_users_count: faker.random.number(),
            speaker_id: faker.random.uuid(),
            text: faker.lorem.sentence(),
            type: faker.lorem.word(),
            word_count: faker.random.number(),
            workspace: faker.random.alphaNumeric(12),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
