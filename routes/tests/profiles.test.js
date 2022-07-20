const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')
const isAuthenticatedController = require('../../controllers/isAuthenticated')
const profilesController = require('../../controllers/profiles/profiles')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(profilesController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

describe('/v0/profiles', function () {
    test('POST /v0/profiles -> success', function (done) {
        return createTestClient()
            .post('/v0/profiles')
            .expect(200)
            .end(done)
    })

    test('GET /v0/profiles?email=email -> success', function (done) {
        return createTestClient()
            .get('/v0/profiles?email=email')
            .expect(200)
            .end(done)
    })

    test('GET /v0/profiles/:profile_id -> success', function (done) {
        return createTestClient()
            .get('/v0/profiles/profile_id')
            .expect(200)
            .end(done)
    })

    test('DELETE /v0/profiles/:profile_id -> success', function (done) {
        return createTestClient()
            .delete('/v0/profiles/profile_id')
            .expect(200)
            .end(done)
    })

    test('PUT /v0/profiles/:profile_id/identity -> success', function (done) {
        return createTestClient()
            .put('/v0/profiles/profile_id/identity')
            .expect(200)
            .end(done)
    })

    test('DELETE /v0/profiles/:profile_id/identity -> success', function (done) {
        return createTestClient()
            .delete('/v0/profiles/profile_id/identity')
            .expect(200)
            .end(done)
    })
})
