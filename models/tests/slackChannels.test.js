const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertChannel,
    selectChannels,
    selectChannelsBySubscribed,
    updateChannelSubscription,
} = require('../slackChannels')

describe('slackChannels', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertChannel() - success', async function () {
        const result = await insertChannel({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            created: faker.date.recent(),
            creator: faker.random.alphaNumeric(12),
            is_channel: faker.random.boolean(),
            is_group: faker.random.boolean(),
            is_im: faker.random.boolean(),
            is_private: faker.random.boolean(),
            is_subscribed: faker.random.boolean(),
            name: faker.lorem.word(),
            previous_names: [faker.random.word()],
            topic: faker.lorem.word(),
            workspace: faker.random.alphaNumeric(12),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectChannels() - success', async function () {
        const result = await selectChannels()
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectChannelsBySubscribed() - success', async function () {
        const result = await selectChannelsBySubscribed()
        return expect(result.constructor.name).toBe('Object')
    })

    test('updateChannelSubscription() - success', async function () {
        const result = await updateChannelSubscription({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            is_subscribed: faker.random.boolean(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
