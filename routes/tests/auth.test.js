const { createTestClient, mockModuleMethods, mockNext, mockStatus200 } = require('./helpers')

const connectGoogleController = require('../../controllers/auth/connect.google')
const connectMicrosoftController = require('../../controllers/auth/connect.microsoft')
const loginGoogleController = require('../../controllers/auth/login.google')
const loginMicrosoftController = require('../../controllers/auth/login.microsoft')
const loginPasswordController = require('../../controllers/auth/login.password')
const logoutController = require('../../controllers/auth/logout')
const lookupAccountController = require('../../controllers/auth/lookup.account')
const lookupUsernameController = require('../../controllers/auth/lookup.username')
const passwordResetController = require('../../controllers/auth/password.reset')
const passwordResetTokenController = require('../../controllers/auth/password.reset.token')

const legacyController = require('../../controllers/auth/legacy')
const openapiMiddleware = require('../../helpers/openapi')

mockModuleMethods(connectGoogleController, mockStatus200)
mockModuleMethods(connectMicrosoftController, mockStatus200)
mockModuleMethods(loginGoogleController, mockStatus200)
mockModuleMethods(loginMicrosoftController, mockStatus200)
mockModuleMethods(loginPasswordController, mockStatus200)
mockModuleMethods(logoutController, mockStatus200)
mockModuleMethods(lookupAccountController, mockStatus200)
mockModuleMethods(lookupUsernameController, mockStatus200)
mockModuleMethods(passwordResetController, mockStatus200)
mockModuleMethods(passwordResetTokenController, mockStatus200)

mockModuleMethods(legacyController, mockStatus200)
mockModuleMethods(openapiMiddleware, mockNext)

const client = createTestClient()

describe('/auth', function () {
    test('GET /v0/auth/connect/google/mobile -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/connect/google/mobile')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/connect/google/web -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/connect/google/web')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/connect/microsoft/mobile -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/connect/microsoft/mobile')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/connect/microsoft/web -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/connect/microsoft/web')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/login/google/mobile -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/login/google/mobile')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/login/google/web -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/login/google/web')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/login/microsoft/mobile -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/login/microsoft/mobile')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/login/microsoft/web -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/login/microsoft/web')
            .expect(200)
            .end(done)
    })

    test('POST /v0/auth/login/password -> success', function (done) {
        return createTestClient()
            .post('/v0/auth/login/password')
            .expect(200)
            .end(done)
    })

    test('POST /v0/auth/logout -> success', function (done) {
        return createTestClient()
            .post('/v0/auth/logout')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/lookup/:account/account -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/lookup/account/account')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/lookup/:username/username -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/lookup/username/username')
            .expect(200)
            .end(done)
    })

    test('POST /v0/auth/password/reset -> success', function (done) {
        return createTestClient()
            .post('/v0/auth/password/reset')
            .expect(200)
            .end(done)
    })

    test('GET /v0/auth/password/reset/:reset_token -> success', function (done) {
        return createTestClient()
            .get('/v0/auth/password/reset/reset_token')
            .expect(200)
            .end(done)
    })

    /* --- LEGACY --- */

    test('POST /v0/auth/register - success', async function () {
        const response = await client.post('/v0/auth/register')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/auth/instagram - success', async function () {
        const response = await client.get('/v0/auth/instagram')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/auth/linkedin - success', async function () {
        const response = await client.get('/v0/auth/linkedin')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/auth/slack - success', async function () {
        const response = await client.get('/v0/auth/slack')
        return expect(response.status).toBe(200)
    })

    test('POST /v0/auth/twitter - success', async function () {
        const response = await client.post('/v0/auth/twitter')
        return expect(response.status).toBe(200)
    })

    test('GET /v0/auth/zoom - success', async function () {
        const response = await client.get('/v0/auth/zoom')
        return expect(response.status).toBe(200)
    })
})
