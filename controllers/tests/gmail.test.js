const faker = require('faker')
const request = require('supertest')

const emailsGmail = require('../../models/emailsGmail')
const isAuthenticatedController = require('../isAuthenticated')

jest.mock('../../models/emailsGmail')
isAuthenticatedController.isAuthenticated = jest.fn((_req, _res, next) => next())

const app = require('../../index')
const client = request(app)

describe.skip('gmail', function () {
    test('insertEmail() - success', async function () {
        emailsGmail.insertEmail.mockResolvedValue({})
        const response = await client.post('/v0/gmail')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                date_received: faker.date.recent(),
                email_attachment_names: [faker.random.alphaNumeric(32)],
                email_content: faker.lorem.sentence(),
                email_from: faker.internet.email(),
                email_subject: faker.lorem.words(3),
                email_to: [faker.internet.email()],
                is_solitary_recipient: faker.random.boolean(),
                labels: [faker.random.word()],
                speaker_id: faker.random.uuid(),
                thread_id: faker.random.alphaNumeric(12),
            } })
        expect(response.status).toBe(201)
    })

    test('selectEmailsByAccountId() - success', async function () {
        emailsGmail.selectEmailsByAccountId.mockResolvedValue({})
        const response = await client.get('/v0/gmail/account/test')
        expect(response.status).toBe(200)
    })

    test('setEmailsCategory() - success', async function () {
        emailsGmail.updateEmailCategory.mockResolvedValue({})
        const response = await client.put('/v0/gmail/category')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                category: [faker.random.word()],
                confidence_category: [Math.random()],
            } })
        expect(response.status).toBe(204)
    })

    test('setEmailEmotions() - success', async function () {
        emailsGmail.updateEmailEmotions.mockResolvedValue({})
        const response = await client.put('/v0/gmail/emotions')
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

    test('setEmailsEntities() - success', async function () {
        emailsGmail.updateEmailEntities.mockResolvedValue({})
        const response = await client.put('/v0/gmail/entities')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                named_entities: [faker.random.word()],
                named_entities_endpos: [JSON.stringify([faker.random.number()])],
                named_entities_startpos: [JSON.stringify([faker.random.number()])],
                named_entities_type: [faker.random.word()],
                named_entities_weight: [faker.random.number()],
            } })
        expect(response.status).toBe(204)
    })

    test('setEmailsGroundTruth() - success', async function () {
        emailsGmail.updateEmailGroundTruth.mockResolvedValue({})
        const response = await client.put('/v0/gmail/groundtruth')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                category_ground_truth: faker.random.word(),
            } })
        expect(response.status).toBe(204)
    })

    test('setEmailsKeywords() - success', async function () {
        emailsGmail.updateEmailKeywords.mockResolvedValue({})
        const response = await client.put('/v0/gmail/keywords')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                keywords: [faker.random.word()],
                keywords_endpos: [JSON.stringify([faker.random.number()])],
                keywords_startpos: [JSON.stringify([faker.random.number()])],
                keywords_weight: [Math.random()],
            } })
        expect(response.status).toBe(204)
    })

    test('setEmailsPerson() - success', async function () {
        emailsGmail.updateEmailPerson.mockResolvedValue({})
        const response = await client.put('/v0/gmail/person')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                confidence_is_person: Math.random(),
                is_person: faker.random.boolean(),
            } })
        expect(response.status).toBe(204)
    })

    test('setEmailsTopics() - success', async function () {
        emailsGmail.updateEmailTopics.mockResolvedValue({})
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
        emailsGmail.updateEmailWordCount.mockResolvedValue({})
        const response = await client.put('/v0/gmail/wordcount')
            .send({ data: {
                id: faker.random.alphaNumeric(12),
                user_id: faker.random.uuid(),
                account_id: faker.random.uuid(),
                word_count: faker.random.number(),
            } })
        expect(response.status).toBe(204)
    })
})
