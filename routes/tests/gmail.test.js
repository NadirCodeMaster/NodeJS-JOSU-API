const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const gmailController = require('../../controllers/gmail')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(gmailController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/gmail', function () {
    test('POST /v0/gmail - success', async function () {
        const response = await client.post('/v0/gmail')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/gmail/category - success', async function () {
        const response = await client.put('/v0/gmail/category')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/gmail/emotions - success', async function () {
        const response = await client.put('/v0/gmail/emotions')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/gmail/entities - success', async function () {
        const response = await client.put('/v0/gmail/entities')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/gmail/groundtruth - success', async function () {
        const response = await client.put('/v0/gmail/groundtruth')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/gmail/keywords - success', async function () {
        const response = await client.put('/v0/gmail/keywords')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/gmail/person - success', async function () {
        const response = await client.put('/v0/gmail/person')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/gmail/topics - success', async function () {
        const response = await client.put('/v0/gmail/topics')
        return expect(response.status).toBe(200)
    })

    test('PUT /v0/gmail/wordcount - success', async function () {
        const response = await client.put('/v0/gmail/wordcount')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/gmail/account/:account_id - success', async function () {
        const response = await client.get('/v0/gmail/account/true')
        return expect(response.status).toBe(200)
    })
})
