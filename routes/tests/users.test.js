const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')

const isAuthenticatedController = require('../../controllers/isAuthenticated')
const accountController = require('../../controllers/users/account')
const deviceController = require('../../controllers/users/device')
const passwordController = require('../../controllers/users/password')
const profileController = require('../../controllers/users/profile')
const usernameController = require('../../controllers/users/username')
const usersController = require('../../controllers/users/users')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(isAuthenticatedController, mockNext)
mockModuleMethods(accountController, mockStatus200)
mockModuleMethods(deviceController, mockStatus200)
mockModuleMethods(passwordController, mockStatus200)
mockModuleMethods(profileController, mockStatus200)
mockModuleMethods(usernameController, mockStatus200)
mockModuleMethods(usersController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

describe('/v0/users', function () {
    test('GET /v0/users -> success', function (done) {
        return createTestClient()
            .get('/v0/users')
            .expect(200)
            .end(done)
    })

    test('GET /v0/users/:user_id -> success', function (done) {
        return createTestClient()
            .get('/v0/users/user_id')
            .expect(200)
            .end(done)
    })

    test('PUT /v0/users/:user_id -> success', function (done) {
        return createTestClient()
            .put('/v0/users/user_id')
            .expect(200)
            .end(done)
    })

    test('DELETE /v0/users/:user_id/account -> success', function (done) {
        return createTestClient()
            .delete('/v0/users/user_id/account')
            .expect(200)
            .end(done)
    })

    test('PUT /v0/users/:user_id/device -> success', function (done) {
        return createTestClient()
            .put('/v0/users/user_id/device')
            .expect(200)
            .end(done)
    })

    test('DELETE /v0/users/:user_id/device -> success', function (done) {
        return createTestClient()
            .delete('/v0/users/user_id/device')
            .expect(200)
            .end(done)
    })

    test('PUT /v0/users/:user_id/password -> success', function (done) {
        return createTestClient()
            .put('/v0/users/user_id/password')
            .expect(200)
            .end(done)
    })

    test('DELETE /v0/users/:user_id/profile -> success', function (done) {
        return createTestClient()
            .delete('/v0/users/user_id/profile')
            .expect(200)
            .end(done)
    })

    test('PUT /v0/users/:user_id/username -> success', function (done) {
        return createTestClient()
            .put('/v0/users/user_id/username')
            .expect(200)
            .end(done)
    })
})
