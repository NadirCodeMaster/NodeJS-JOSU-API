const defaults = require('superagent-defaults')
const faker = require('faker')
const request = require('supertest')

const isAuthenticatedController = require('../isAuthenticated')
const slackChannels = require('../../models/slackChannels')
const slackMessages = require('../../models/slackMessages')
const slackQueue = require('../../models/slackQueue')
const slackWorkspaces = require('../../models/slackWorkspaces')
const userAccounts = require('../../models/userAccounts')

jest.mock('../../models/slackChannels')
jest.mock('../../models/slackMessages')
jest.mock('../../models/slackQueue')
jest.mock('../../models/slackWorkspaces')
jest.mock('../../models/userAccounts')

isAuthenticatedController.isAuthenticated = jest.fn((req, res, next) => next())

const DATA = {}
const SUCCESS = { rows: DATA }

const app = require('../../index')
const client = defaults(request(app))

client.set('Content-Type', 'application/json')

describe.skip('/slack', function () {
    test('Create new channel - success', async function () {
        slackChannels.insertChannel.mockResolvedValue(SUCCESS)
        userAccounts.selectUserAccounts.mockResolvedValue({ rows: [] })
        const response = await client.post('/v0/slack/channels').send({
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
            created: faker.date.recent(),
            creator: faker.random.alphaNumeric(12),
            is_channel: faker.random.boolean(),
            is_group: faker.random.boolean(),
            is_im: faker.random.boolean(),
            is_private: faker.random.boolean(),
            name: faker.lorem.word(),
            previous_names: [faker.lorem.word()],
            type: faker.lorem.word(),
            topic: faker.lorem.word(),
            workspace: faker.random.alphaNumeric(12),
        })
        expect(response.body).toStrictEqual({})
    })

    test('Create new message - success', async function () {
        slackMessages.insertMessage.mockResolvedValue(SUCCESS)
        const response = await client.post('/v0/slack/messages').send({
            id: faker.random.uuid(),
            author: faker.random.alphaNumeric(12),
            channel: faker.random.alphaNumeric(12),
            created: faker.date.recent(),
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
        expect(response.body).toHaveProperty('data')
    })

    test('Create new workspace - success', async function () {
        slackWorkspaces.insertWorkspace.mockResolvedValue(SUCCESS)
        userAccounts.selectUserAccounts.mockResolvedValue({ rows: [] })
        const response = await client.post('/v0/slack/workspaces').send({
            id: faker.random.alphaNumeric(6),
            user_id: faker.random.uuid(),
            domain: faker.internet.domainWord(),
            email_domain: faker.internet.domainWord(),
            name: faker.lorem.word(),
        })
        expect(response.body).toStrictEqual({})
    })

    test('Dequeue messages - success', async function () {
        slackQueue.deleteQueue.mockResolvedValue(SUCCESS)
        const response = await client.delete('/v0/slack/queue').send([{
            id: faker.random.uuid(),
        }])
        expect(response.status).toBe(204)
    })

    test('Enqueue messages - success', async function () {
        slackQueue.insertQueue.mockResolvedValue(SUCCESS)
        const response = await client.post('/v0/slack/queue').send({
            id: faker.random.uuid(),
            text: faker.random.words(12),
        })
        expect(response.body).toHaveProperty('data')
    })

    test('Get list of subscribed channels - success', async function () {
        slackChannels.selectChannelsBySubscribed.mockResolvedValue(SUCCESS)
        const response = await client.get('/v0/slack/channels/subscribed')
        expect(response.body.data).toStrictEqual(DATA)
    })

    test('Get list of subscribed workspaces - success', async function () {
        slackWorkspaces.selectWorkspacesBySubscribed.mockResolvedValue(SUCCESS)
        const response = await client.get('/v0/slack/workspaces/subscribed')
        expect(response.body.data).toStrictEqual(DATA)
    })

    test('Set channel subscription - success', async function () {
        slackChannels.updateChannelSubscription.mockResolvedValue(SUCCESS)
        userAccounts.selectUserAccounts.mockResolvedValue({ rows: [] })
        const response = await client.put('/v0/slack/channels/subscribed').send([{
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
        }])
        expect(response.body).toStrictEqual({})
    })

    test('Set workspace subscription - success', async function () {
        slackWorkspaces.updateWorkspaceSubscription.mockResolvedValue(SUCCESS)
        const response = await client.put('/v0/slack/workspaces/subscribed').send([{
            id: faker.random.alphaNumeric(12),
            user_id: faker.random.uuid(),
        }])
        expect(response.status).toBe(201)
    })
})
