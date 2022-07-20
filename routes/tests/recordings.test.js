const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const recordingsController = require('../../controllers/recordings')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(recordingsController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/recordings', function () {
    test('GET /v0/recordings/users/:username - success', async function () {
        const response = await client.get('/v0/recordings/users/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/recordings/:username - success', async function () {
        const response = await client.get('/v0/recordings/test')
        return expect(response.status).toBe(200)
    })

    test('DELETE /v0/recordings/:username - success', async function () {
        const response = await client.delete('/v0/recordings/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/recordings/:recording_id/stage - success', async function () {
        const response = await client.get('/v0/recordings/test/stage')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/recordings/:recording_id/processed - success', async function () {
        const response = await client.put('/v0/recordings/test/processed')
        return expect(response.status).toBe(200)
    })

    test.skip('GET /v0/recordings/:username/fake - failure', async function () {
        const response = await client.get('/v0/recordings/test/fake')
        return expect(response.status).toBe(404)
    })

    test('GET /v0/queue/recordings/:username - success', async function () {
        const response = await client.get('/v0/recordings/recordings/test')
        return expect(response.status).toBe(200)
    })
})
