const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const topicsController = require('../../controllers/topics')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(topicsController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/topics', function () {
    test('POST /v0/topics - success', async function () {
        const response = await client.post('/v0/topics')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/topics/:user_id - success', async function () {
        const response = await client.get('/v0/topics/true')
        return expect(response.status).toBe(200)
    })
})
