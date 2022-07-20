const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertEmail,
    selectEmailsByAccountId,
    updateEmailCategory,
    updateEmailEmotions,
    updateEmailEntities,
    updateEmailGroundTruth,
    updateEmailKeywords,
    updateEmailPerson,
    updateEmailTopics,
    updateEmailWordCount,
} = require('../emailsOutlook')

describe('emailsOutlook', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertEmail() - success', async function () {
        const result = await insertEmail({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            bcc_recipients: [faker.internet.email()],
            category: [faker.random.word()],
            category_ground_truth: faker.random.word(),
            cc_recipients: [faker.internet.email()],
            change_key: faker.random.alphaNumeric(24),
            confidence_category: [Math.random()],
            confidence_is_person: Math.random(),
            conversation_id: faker.random.alphaNumeric(12),
            conversation_index: faker.random.alphaNumeric(6),
            created_datetime: faker.date.recent(),
            date_received: faker.date.recent(),
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
            flag_status: faker.random.word(),
            has_attachments: faker.random.boolean(),
            importance: faker.random.word(),
            inference_classification: faker.random.word(),
            internet_message_id: faker.random.alphaNumeric(24),
            is_delivery_receipt_requested: faker.random.boolean(),
            is_draft: faker.random.boolean(),
            is_person: faker.random.boolean(),
            is_read: faker.random.boolean(),
            is_read_receipt_requested: faker.random.boolean(),
            is_solitary_recipient: faker.random.boolean(),
            keywords: [faker.random.word()],
            keywords_endpos: [JSON.stringify([faker.random.number()])],
            keywords_startpos: [JSON.stringify([faker.random.number()])],
            keywords_weight: [Math.random()],
            labels: [faker.random.word()],
            last_modified_datetime: faker.date.recent(),
            location: faker.address.city(),
            named_entities: [faker.random.word()],
            named_entities_endpos: [JSON.stringify([faker.random.number()])],
            named_entities_startpos: [JSON.stringify([faker.random.number()])],
            named_entities_type: [faker.random.word()],
            named_entities_weight: [faker.random.number()],
            parent_folder_id: faker.random.alphaNumeric(24),
            reply_to: [faker.internet.email()],
            sender_name: faker.name.firstName(),
            sender_address: faker.address.secondaryAddress(),
            sent_datetime: faker.date.recent(),
            speaker_id: faker.random.uuid(),
            topics: [faker.random.word()],
            topics_weight: [Math.random()],
            web_link: faker.internet.url(),
            word_count: faker.random.number(),
        })
        expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectEmailsByAccountId() - success', async function () {
        const result = await selectEmailsByAccountId({
            account_id: faker.random.uuid(),
        }, {})
        expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailCategory() - success', async function () {
        const result = await updateEmailCategory({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            category: [faker.random.word()],
            confidence_category: [Math.random()],
        })
        expect(result.constructor.name).toBe('ResultSet')
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
        expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailsGroundTruth() - success', async function () {
        const result = await updateEmailGroundTruth({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            category_ground_truth: faker.random.word(),
        })
        expect(result.constructor.name).toBe('ResultSet')
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
        expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateEmailPerson() - success', async function () {
        const result = await updateEmailPerson({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            account_id: faker.random.uuid(),
            confidence_is_person: Math.random(),
            is_person: faker.random.boolean(),
        })
        expect(result.constructor.name).toBe('ResultSet')
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
        expect(result.constructor.name).toBe('ResultSet')
    })
})
