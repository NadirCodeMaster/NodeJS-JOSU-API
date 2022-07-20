const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const analyticsController = require('../../controllers/analytics')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(analyticsController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/analytics', function () {
    test('POST /v0/analytics/talkbreakdown - success', async function () {
        const response = await client.post('/v0/analytics/talkbreakdown')
        return expect(response.status).toBe(200)
    })
})
