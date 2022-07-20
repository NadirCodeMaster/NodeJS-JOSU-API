const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertMeeting,
    selectMeetings,
    selectMeetingsAfter,
    selectMeetingsAfterBefore,
    selectMeeting,
    updateMeeting,
    deleteMeeting,
} = require('../meetings')

require('./helpers')

describe('meetings', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertMeeting() -> success', async function () {
        const result = await insertMeeting({
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
            __provider: faker.random.word(),
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
            status: faker.random.word(),
            subject: faker.random.words(3),
            text_content: faker.lorem.sentences(1),
            updated: faker.date.recent(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectMeetings() -> success', async function () {
        const result = await selectMeetings({
            user_id: faker.random.uuid(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectMeetingsAfter() -> success', async function () {
        const result = await selectMeetingsAfter({
            user_id: faker.random.uuid(),
            after: faker.date.recent(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectMeetingsAfterBefore() -> success', async function () {
        const result = await selectMeetingsAfterBefore({
            user_id: faker.random.uuid(),
            after: faker.date.recent(),
            before: faker.date.future(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectMeeting() -> success', async function () {
        const result = await selectMeeting({
            user_id: faker.random.uuid(),
            start: faker.date.recent(),
            id: faker.random.alphaNumeric(16),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('updateMeeting() -> success', async function () {
        const result = await updateMeeting({
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
            __provider: faker.random.word(),
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
            status: faker.random.word(),
            subject: faker.random.words(3),
            text_content: faker.lorem.sentences(1),
            updated: faker.date.recent(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('deleteMeeting() -> success', async function () {
        const result = await deleteMeeting({
            user_id: faker.random.uuid(),
            start: faker.date.recent(),
            end: faker.date.future(),
            id: faker.random.alphaNumeric(16),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
