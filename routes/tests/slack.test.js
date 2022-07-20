const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const slackController = require('../../controllers/slack')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(slackController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/slack', function () {
    test('GET /v0/slack/channels - success', async function () {
        const response = await client.get('/v0/slack/channels')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/slack/channels - success', async function () {
        const response = await client.post('/v0/slack/channels')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/slack/channels/subscribed - success', async function () {
        const response = await client.get('/v0/slack/channels/subscribed')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/slack/channels/subscribed - success', async function () {
        const response = await client.put('/v0/slack/channels/subscribed')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/slack/messages - success', async function () {
        const response = await client.post('/v0/slack/messages')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/slack/queue - success', async function () {
        const response = await client.post('/v0/slack/queue')
        return expect(response.status).toBe(200)
    })

    test('DELETE /v0/slack/queue - success', async function () {
        const response = await client.delete('/v0/slack/queue')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/slack/workspaces - success', async function () {
        const response = await client.get('/v0/slack/workspaces')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/slack/workspaces - success', async function () {
        const response = await client.post('/v0/slack/workspaces')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/slack/workspaces/subscribed - success', async function () {
        const response = await client.get('/v0/slack/workspaces/subscribed')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/slack/workspaces/subscribed - success', async function () {
        const response = await client.put('/v0/slack/workspaces/subscribed')
        return expect(response.status).toBe(200)
    })
})
