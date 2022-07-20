const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const emotionController = require('../../controllers/emotion')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(emotionController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/emotion', function () {
    test('GET /v0/emotion/topic/:username - success', async function () {
        const response = await client.get('/v0/emotion/topic/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/emotion/speaker/:username - success', async function () {
        const response = await client.get('/v0/emotion/speaker/test')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/emotion/watson - success', async function () {
        const response = await client.post('/v0/emotion/watson')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/emotion/watson/:user_id - success', async function () {
        const response = await client.get('/v0/emotion/watson/test')
        return expect(response.status).toBe(200)
    })
})
