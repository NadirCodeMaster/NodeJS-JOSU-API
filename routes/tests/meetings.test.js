const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')

const isAuthenticatedController = require('../../controllers/isAuthenticated')
const meetingsController = require('../../controllers/meetings/meetings')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(meetingsController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

describe('/v0/meetings', function () {
    test('POST /v0/meetings -> success', function (done) {
        return createTestClient()
            .post('/v0/meetings')
            .expect(200)
            .end(done)
    })

    test('GET /v0/meetings/:user_id?after=after&before=before -> success', function (done) {
        return createTestClient()
            .get('/v0/meetings/user_id?after=after&before=before')
            .expect(200)
            .end(done)
    })

    test('GET /v0/meetings/:user_id/:start/:id -> success', function (done) {
        return createTestClient()
            .get('/v0/meetings/user_id/start/id')
            .expect(200)
            .end(done)
    })

    test('PUT /v0/meetings/:user_id/:start/:id -> success', function (done) {
        return createTestClient()
            .put('/v0/meetings/user_id/start/id')
            .expect(200)
            .end(done)
    })

    test('DELETE /v0/meetings/:user_id/:start/:id -> success', function (done) {
        return createTestClient()
            .delete('/v0/meetings/user_id/start/id')
            .expect(200)
            .end(done)
    })
})
