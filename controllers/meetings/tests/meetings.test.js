const faker = require('faker')

const meetings = require('../../../models/meetings')
jest.mock('../../../models/meetings')

const { API_USERNAME, API_PASSWORD } = process.env
const { BEARER_TOKEN, PROVIDER, STATUS, createTestClient } = require('../../tests/helpers')

describe('meetings', function () {
    beforeEach(() => faker.seed(1))

    test('createMeeting() -> success', function (done) {
        meetings.insertMeeting.mockResolvedValue({})
        return createTestClient()
            .post('/v0/meetings')
            .auth(API_USERNAME, API_PASSWORD)
            .send({ data: {
                user_id: faker.random.uuid(),
                start: faker.date.recent(),
                id: faker.random.alphaNumeric(16),
                __account: faker.random.alphaNumeric(16),
                __attendees_profiles: [faker.random.uuid()],
                __calendar: faker.random.alphaNumeric(16),
                __invitee_email: faker.internet.email(),
                __invitee_name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                __invitee_profile: faker.random.uuid(),
                __is_cancelled: faker.random.boolean(),
                __is_generic: faker.random.boolean(),
                __is_important: faker.random.boolean(),
                __is_invited: faker.random.boolean(),
                __is_rescheduled: faker.random.boolean(),
                __organizer_profile: faker.random.uuid(),
                __provider: faker.random.arrayElement(PROVIDER),
                __zoom_end: faker.date.future(),
                __zoom_is_invited: faker.random.boolean(),
                __zoom_meeting: String(faker.random.number({ min: 1e8, max: 1e12 })),
                __zoom_password: faker.random.alphaNumeric(8),
                __zoom_start: faker.date.recent(),
                __zoom_summary: faker.lorem.sentences(3),
                __zoom_transcript: faker.internet.url(),
                __zoom_url: faker.internet.url(),
                attachments: [faker.random.alphaNumeric(32)],
                attendees_emails: [faker.internet.email()],
                attendees_names: [faker.fake('{{name.firstName}} {{name.lastName}}')],
                created: faker.date.recent(),
                end: faker.date.recent(),
                is_organizer: faker.random.boolean(),
                labels: [faker.random.word()],
                link: faker.internet.url(),
                location: faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.country}}'),
                organizer_email: faker.internet.email(),
                organizer_name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                status: faker.random.arrayElement(STATUS),
                subject: faker.random.words(3),
                text_content: faker.lorem.sentences(1),
                updated: faker.date.recent(),
            } })
            .expect(202)
            .end(done)
    })

    test('getMeetings() :: user_id -> success', function (done) {
        meetings.selectMeetings.mockResolvedValue({})
        return createTestClient()
            .get(`/v0/meetings/${faker.random.uuid()}`)
            .auth(BEARER_TOKEN, { type: 'bearer' })
            .expect(200)
            .end(done)
    })

    test('getMeetings() :: user_id, after -> success', function (done) {
        meetings.selectMeetingsAfter.mockResolvedValue({})
        const userId = faker.random.uuid()
        const after = faker.date.recent().toISOString()
        return createTestClient()
            .get(`/v0/meetings/${userId}`)
            .query({ after })
            .auth(BEARER_TOKEN, { type: 'bearer' })
            .expect(200)
            .end(done)
    })

    test('getMeetings() :: user_id, after, before -> success', function (done) {
        meetings.selectMeetingsAfterBefore.mockResolvedValue({})
        const userId = faker.random.uuid()
        const after = faker.date.recent().toISOString()
        const before = faker.date.recent().toISOString()
        return createTestClient()
            .get(`/v0/meetings/${userId}`)
            .query({ after, before })
            .auth(BEARER_TOKEN, { type: 'bearer' })
            .expect(200)
            .end(done)
    })

    test('getMeeting() -> success', function (done) {
        meetings.selectMeeting.mockResolvedValue({})
        const userId = faker.random.uuid()
        const start = faker.date.recent().toISOString()
        const id = faker.random.alphaNumeric(16)
        return createTestClient()
            .get(`/v0/meetings/${userId}/${start}/${id}`)
            .auth(BEARER_TOKEN, { type: 'bearer' })
            .expect(200)
            .end(done)
    })

    test('putMeeting() -> success', function (done) {
        meetings.updateMeeting.mockResolvedValue({})
        const userId = faker.random.uuid()
        const start = faker.date.recent().toISOString()
        const id = faker.random.alphaNumeric(16)
        return createTestClient()
            .put(`/v0/meetings/${userId}/${start}/${id}`)
            .auth(API_USERNAME, API_PASSWORD)
            .send({ data: {
                user_id: userId,
                start,
                id,
                __account: faker.random.alphaNumeric(16),
                __attendees_profiles: [faker.random.uuid()],
                __calendar: faker.random.alphaNumeric(16),
                __invitee_email: faker.internet.email(),
                __invitee_name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                __invitee_profile: faker.random.uuid(),
                __is_cancelled: faker.random.boolean(),
                __is_generic: faker.random.boolean(),
                __is_important: faker.random.boolean(),
                __is_invited: faker.random.boolean(),
                __is_rescheduled: faker.random.boolean(),
                __organizer_profile: faker.random.uuid(),
                __provider: faker.random.arrayElement(PROVIDER),
                __zoom_end: faker.date.future(),
                __zoom_is_invited: faker.random.boolean(),
                __zoom_meeting: String(faker.random.number({ min: 1e8, max: 1e12 })),
                __zoom_password: faker.random.alphaNumeric(8),
                __zoom_start: faker.date.recent(),
                __zoom_summary: faker.lorem.sentences(3),
                __zoom_transcript: faker.internet.url(),
                __zoom_url: faker.internet.url(),
                attachments: [faker.random.alphaNumeric(32)],
                attendees_emails: [faker.internet.email()],
                attendees_names: [faker.fake('{{name.firstName}} {{name.lastName}}')],
                created: faker.date.recent(),
                end: faker.date.recent(),
                is_organizer: faker.random.boolean(),
                labels: [faker.random.word()],
                link: faker.internet.url(),
                location: faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.country}}'),
                organizer_email: faker.internet.email(),
                organizer_name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                status: faker.random.arrayElement(STATUS),
                subject: faker.random.words(3),
                text_content: faker.lorem.sentences(1),
                updated: faker.date.recent(),
            } })
            .expect(202)
            .end(done)
    })

    test('dropMeeting() -> success', function (done) {
        meetings.deleteMeeting.mockResolvedValue({})
        const userId = faker.random.uuid()
        const start = faker.date.recent().toISOString()
        const id = faker.random.alphaNumeric(16)
        return createTestClient()
            .delete(`/v0/meetings/${userId}/${start}/${id}`)
            .auth(API_USERNAME, API_PASSWORD)
            .expect(202)
            .end(done)
    })
})
