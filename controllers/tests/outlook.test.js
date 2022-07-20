const faker = require('faker')
const request = require('supertest')

const emailsOutlook = require('../../models/emailsOutlook')
const isAuthenticatedController = require('../isAuthenticated')

jest.mock('../../models/emailsOutlook')
isAuthenticatedController.isAuthenticated = jest.fn((_req, _res, next) => next())

const app = require('../../index')
const client = request(app)

describe.skip('outlook', function () {
    test('createEmail() - success', async function () {
        emailsOutlook.insertEmail.mockResolvedValue({})
        const response = await client.post('/v0/outlook')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                bcc_recipients: [faker.internet.email()],
                cc_recipients: [faker.internet.email()],
                change_key: faker.random.alphaNumeric(24),
                conversation_id: faker.random.alphaNumeric(12),
                conversation_index: faker.random.alphaNumeric(6),
                created_datetime: faker.date.recent(),
                date_received: faker.date.recent(),
                email_content: faker.lorem.sentence(),
                email_from: faker.internet.email(),
                email_subject: faker.lorem.words(3),
                email_to: [faker.internet.email()],
                flag_status: faker.random.word(),
                has_attachments: faker.random.boolean(),
                importance: faker.random.word(),
                inference_classification: faker.random.word(),
                internet_message_id: faker.random.alphaNumeric(24),
                is_delivery_receipt_requested: faker.random.boolean(),
                is_draft: faker.random.boolean(),
                is_read: faker.random.boolean(),
                is_read_receipt_requested: faker.random.boolean(),
                is_solitary_recipient: faker.random.boolean(),
                labels: [faker.random.word()],
                last_modified_datetime: faker.date.recent(),
                location: faker.address.city(),
                parent_folder_id: faker.random.alphaNumeric(24),
                reply_to: [faker.internet.email()],
                sender_name: faker.name.firstName(),
                sender_address: faker.address.secondaryAddress(),
                sent_datetime: faker.date.recent(),
                speaker_id: faker.random.uuid(),
                web_link: faker.internet.url(),
            } })
        expect(response.status).toBe(201)
    })

    test('getEmailsByAccountId() - success', async function () {
        emailsOutlook.selectEmailsByAccountId.mockResolvedValue({})
        const response = await client.get('/v0/outlook/account/test')
        expect(response.status).toBe(200)
    })

    test('setEmailsCategory() - success', async function () {
        emailsOutlook.updateEmailCategory.mockResolvedValue({})
        const response = await client.put('/v0/outlook/category')
            .send({ data: [{
                id: faker.random.uuid(),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                category: [faker.random.word()],
                confidence_category: [Math.random()],
            }] })
        expect(response.status).toBe(204)
    })

    test('setEmailEmotions() - success', async function () {
        emailsOutlook.updateEmailEmotions.mockResolvedValue({})
        const response = await client.put('/v0/outlook/emotions')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                emotions: [faker.random.word()],
                emotions_endpos: [faker.random.number()],
                emotions_mean: [faker.random.word()],
                emotions_mean_weight: [faker.random.number()],
                emotions_startpos: [faker.random.number()],
                emotions_weight: [faker.random.number()],
            }] })
        expect(response.status).toBe(204)
    })

    test('setEmailEntities() - success', async function () {
        emailsOutlook.updateEmailEntities.mockResolvedValue({})
        const response = await client.put('/v0/outlook/entities')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                named_entities: [faker.random.word()],
                named_entities_endpos: [JSON.stringify([faker.random.number()])],
                named_entities_startpos: [JSON.stringify([faker.random.number()])],
                named_entities_type: [faker.random.word()],
                named_entities_weight: [faker.random.number()],
            }] })
        expect(response.status).toBe(204)
    })

    test('setEmailsGroundTruth() - success', async function () {
        emailsOutlook.updateEmailGroundTruth.mockResolvedValue({})
        const response = await client.put('/v0/outlook/groundtruth')
            .send({ data: [{
                id: faker.random.uuid(),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                category_ground_truth: faker.random.word(),
            }] })
        expect(response.status).toBe(204)
    })

    test('setEmailKeywords() - success', async function () {
        emailsOutlook.updateEmailKeywords.mockResolvedValue({})
        const response = await client.put('/v0/outlook/keywords')
            .send({ data: [{
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                keywords: [faker.random.word()],
                keywords_endpos: [JSON.stringify([faker.random.number()])],
                keywords_startpos: [JSON.stringify([faker.random.number()])],
                keywords_weight: [Math.random()],
            }] })
        expect(response.status).toBe(204)
    })

    test('setEmailsPerson() - success', async function () {
        emailsOutlook.updateEmailPerson.mockResolvedValue({})
        const response = await client.put('/v0/outlook/person')
            .send({ data: [{
                id: faker.random.uuid(),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                confidence_is_person: Math.random(),
                is_person: faker.random.boolean(),
            }] })
        expect(response.status).toBe(204)
    })

    test('updateEmailTopics() - success', async function () {
        emailsOutlook.updateEmailTopics.mockResolvedValue({})
        const response = await client.put('/v0/gmail/topics')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                topics: [faker.random.word()],
                topics_weight: [Math.random()],
            } })
        expect(response.status).toBe(204)
    })

    test('setEmailsWordCount() - success', async function () {
        emailsOutlook.updateEmailWordCount.mockResolvedValue({})
        const response = await client.put('/v0/outlook/wordcount')
            .send({ data: [{
                id: faker.random.uuid(),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                word_count: faker.random.number(),
            }] })
        expect(response.status).toBe(204)
    })
})
