const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertEmail,
    selectEmails,
    selectEmailsByAccountId,
    updateEmailCategory,
    updateEmailEmotions,
    updateEmailEntities,
    updateEmailGroundTruth,
    updateEmailKeywords,
    updateEmailPerson,
    updateEmailTopics,
    updateEmailWordCount,
} = require('../emailsGmail')

describe('emailsGmail', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertEmail() - success', async function () {
        const result = await insertEmail({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            category: [faker.random.word()],
            category_ground_truth: faker.random.word(),
            confidence_category: [Math.random()],
            confidence_is_person: Math.random(),
            date_received: faker.date.recent(),
            email_attachment_names: [faker.random.alphaNumeric(32)],
            email_content: faker.lorem.sentence(),
            email_from: faker.internet.email(),
            email_subject: faker.lorem.words(3),
            email_to: [faker.internet.email()],
            emotions: [faker.random.word()],
            emotions_endpos: [faker.random.number()],
            emotions_mean: [faker.random.word()],
            emotions_mean_weight: [faker.random.number()],
            emotions_startpos: [faker.random.number()],
            emotions_weight: [faker.random.number()],
            is_person: faker.random.boolean(),
            is_solitary_recipient: faker.random.boolean(),
            keywords: [faker.random.word()],
            keywords_endpos: [JSON.stringify([faker.random.number()])],
            keywords_startpos: [JSON.stringify([faker.random.number()])],
            keywords_weight: [Math.random()],
            labels: [faker.random.word()],
            named_entities: [faker.random.word()],
            named_entities_endpos: [JSON.stringify([faker.random.number()])],
            named_entities_startpos: [JSON.stringify([faker.random.number()])],
            named_entities_type: [faker.random.word()],
            named_entities_weight: [faker.random.number()],
            speaker_id: faker.random.uuid(),
            thread_id: faker.random.alphaNumeric(12),
            topics: [faker.random.word()],
            topics_weight: [Math.random()],
            word_count: faker.random.number(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectEmails() - success', async function () {
        const result = await selectEmails({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectEmailsByAccountId() - success', async function () {
        const result = await selectEmailsByAccountId({
            account_id: faker.random.uuid(),
        }, {})
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailCategory() - success', async function () {
        const result = await updateEmailCategory({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            category: [faker.random.word()],
            confidence_category: [Math.random()],
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailEmotions() - success', async function () {
        const result = await updateEmailEmotions({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            emotions: [faker.random.word()],
            emotions_endpos: [faker.random.number()],
            emotions_mean: [faker.random.word()],
            emotions_mean_weight: [faker.random.number()],
            emotions_startpos: [faker.random.number()],
            emotions_weight: [faker.random.number()],
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailEntities() - success', async function () {
        const result = await updateEmailEntities({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            named_entities: [faker.random.word()],
            named_entities_endpos: [JSON.stringify([faker.random.number()])],
            named_entities_startpos: [JSON.stringify([faker.random.number()])],
            named_entities_type: [faker.random.word()],
            named_entities_weight: [faker.random.number()],
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailGroundTruth() - success', async function () {
        const result = await updateEmailGroundTruth({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            category_ground_truth: faker.random.word(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailKeywords() - success', async function () {
        const result = await updateEmailKeywords({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            keywords: [faker.random.word()],
            keywords_endpos: [JSON.stringify([faker.random.number()])],
            keywords_startpos: [JSON.stringify([faker.random.number()])],
            keywords_weight: [Math.random()],
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailPerson() - success', async function () {
        const result = await updateEmailPerson({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            confidence_is_person: Math.random(),
            is_person: faker.random.boolean(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailTopics() - success', async function () {
        const result = await updateEmailTopics({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            topics: [faker.random.word()],
            topics_weight: [Math.random()],
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailWordCount() - success', async function () {
        const result = await updateEmailWordCount({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            word_count: faker.random.number(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
