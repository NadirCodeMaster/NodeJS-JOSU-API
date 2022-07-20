const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const annotationsController = require('../../controllers/annotations')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(annotationsController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/annotations', function () {
    test('GET /v0/annotations/speaker/:speakerId - success', async function () {
        const response = await client.get('/v0/annotations/speaker/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/annotations/recording/:recordingId - success', async function () {
        const response = await client.get('/v0/annotations/recording/test')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/annotations/:annotationId - success', async function () {
        const response = await client.get('/v0/annotations/test')
        return expect(response.status).toBe(200)
    })

    test('DELETE /v0/annotations/:annotationId - success', async function () {
        const response = await client.delete('/v0/annotations/test')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/annotations - success', async function () {
        const response = await client.post('/v0/annotations')
        return expect(response.status).toBe(200)
    })

    test.skip('GET /v0/annotations/speaker/:speakerId/fake - failure', async function () {
        const response = await client.get('/v0/annotations/speaker/test/fake')
        return expect(response.status).toBe(404)
    })
})
