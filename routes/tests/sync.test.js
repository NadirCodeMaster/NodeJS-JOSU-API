const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const syncController = require('../../controllers/sync')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(syncController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/sync', function () {
    test('PUT /v0/sync/:provider/:id - success', async function () {
        const response = await client.put('/v0/sync/gmail/44444444-4444-4444-4444-444444444444')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/gmail/:userId - success', async function () {
        const response = await client.get('/v0/sync/gmail/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/gmail - success', async function () {
        const response = await client.get('/v0/sync/gmail')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/googlecalendar/:userId - success', async function () {
        const response = await client.get('/v0/sync/googlecalendar/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/googlecalendar - success', async function () {
        const response = await client.get('/v0/sync/googlecalendar')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/instagram/:userId - success', async function () {
        const response = await client.get('/v0/sync/instagram/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/instagram - success', async function () {
        const response = await client.get('/v0/sync/instagram')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/linkedin/:userId - success', async function () {
        const response = await client.get('/v0/sync/linkedin/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/linkedin - success', async function () {
        const response = await client.get('/v0/sync/linkedin')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/slack/:userId - success', async function () {
        const response = await client.get('/v0/sync/slack/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/slack - success', async function () {
        const response = await client.get('/v0/sync/slack')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/twitter/:userId - success', async function () {
        const response = await client.get('/v0/sync/twitter/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/twitter - success', async function () {
        const response = await client.get('/v0/sync/twitter')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/zoom/:userId - success', async function () {
        const response = await client.get('/v0/sync/zoom/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/sync/zoom - success', async function () {
        const response = await client.get('/v0/sync/zoom')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/sync/social/active - success', async function () {
        const response = await client.put('/v0/sync/social/active')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/sync/social/remove - success', async function () {
        const response = await client.post('/v0/sync/social/remove')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/sync/social/ - success', async function () {
        const response = await client.put('/v0/sync/social/synced')
        return expect(response.status).toBe(200)
    })
})
