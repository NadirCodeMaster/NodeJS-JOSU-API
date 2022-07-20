const { createTestClient } = require('./helpers')

describe('/spec', function () {
    test('GET /v0/spec -> success', function (done) {
        return createTestClient()
            .get('/v0/spec')
            .expect(200)
            .end(done)
    })
})
