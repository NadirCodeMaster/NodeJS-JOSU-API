const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertWorkspace,
    selectWorkspaces,
    selectWorkspacesBySubscribed,
    updateWorkspaceSubscription,
} = require('../slackWorkspaces')

describe('slackWorkspaces', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertWorkspace() - success', async function () {
        const result = await insertWorkspace({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            created: faker.date.recent(),
            domain: faker.internet.domainWord(),
            email_domain: [faker.internet.domainWord()],
            is_subscribed: faker.random.boolean(),
            name: faker.lorem.word(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectWorkspaces() - success', async function () {
        const result = await selectWorkspaces()
        return expect(result.constructor.name).toBe('ResultSet')
    })

    test('selectWorkspacesBySubscribed() - success', async function () {
        const result = await selectWorkspacesBySubscribed()
        return expect(result.constructor.name).toBe('Object')
    })

    test('updateWorkspaceSubscription() - success', async function () {
        const result = await updateWorkspaceSubscription({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            is_subscribed: faker.random.boolean(),
        })
        return expect(result.constructor.name).toBe('ResultSet')
    })
})
