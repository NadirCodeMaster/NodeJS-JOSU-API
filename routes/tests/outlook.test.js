const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const outlookController = require('../../controllers/outlook')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(outlookController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/outlook', function () {
    test('POST /v0/outlook - success', async function () {
        const response = await client.post('/v0/outlook')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/outlook/category - success', async function () {
        const response = await client.put('/v0/outlook/category')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/outlook/emotions - success', async function () {
        const response = await client.put('/v0/outlook/emotions')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/outlook/entities - success', async function () {
        const response = await client.put('/v0/outlook/entities')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/outlook/groundtruth - success', async function () {
        const response = await client.put('/v0/outlook/groundtruth')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/outlook/keywords - success', async function () {
        const response = await client.put('/v0/outlook/keywords')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/outlook/person - success', async function () {
        const response = await client.put('/v0/outlook/person')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/outlook/wordcount - success', async function () {
        const response = await client.put('/v0/outlook/wordcount')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/outlook/topics - success', async function () {
        const response = await client.put('/v0/outlook/topics')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/outlook/account/:account_id - success', async function () {
        const response = await client.get('/v0/outlook/account/true')
        return expect(response.status).toBe(200)
    })
})
