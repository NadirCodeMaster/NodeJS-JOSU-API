const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const queueController = require('../../controllers/queue')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(queueController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/queue', function () {
    test('POST /v0/queue/emails - success', async function () {
        const response = await client.post('/v0/queue/emails')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/queue/emails - success', async function () {
        const response = await client.get('/v0/queue/emails')
        return expect(response.status).toBe(200)
    })

    test('DELETE /v0/queue/emails - success', async function () {
        const response = await client.delete('/v0/queue/emails')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/queue/emotions - success', async function () {
        const response = await client.post('/v0/queue/emotions')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/queue/emotions - success', async function () {
        const response = await client.get('/v0/queue/emotions')
        return expect(response.status).toBe(200)
    })

    test('DELETE /v0/queue/emotions - success', async function () {
        const response = await client.delete('/v0/queue/emotions')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/queue/topics - success', async function () {
        const response = await client.post('/v0/queue/topics')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/queue/topics - success', async function () {
        const response = await client.get('/v0/queue/topics')
        return expect(response.status).toBe(200)
    })

    test('DELETE /v0/queue/topics - success', async function () {
        const response = await client.delete('/v0/queue/topics')
        return expect(response.status).toBe(200)
    })
})
