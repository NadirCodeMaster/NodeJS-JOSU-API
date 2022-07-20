const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const { insertTopic, selectTopicByUser } = require('../topics')

describe('topics', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertTopic() - success', async function () {
        const result = await insertTopic({
            user_id: faker.random.uuid(),
            provider: faker.random.word(),
            id: faker.random.alphaNumeric(12),
            account_id: faker.random.uuid(),
            created: faker.date.recent(),
            end_time: faker.date.recent(),
            kind: faker.random.word(),
            speaker_id: faker.random.uuid(),
            start_time: faker.date.recent(),
            topic: faker.random.word(),
            type: faker.random.word(),
            weight: Math.random(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectTopicByUser() - success', async function () {
        const result = await selectTopicByUser({
            user_id: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
