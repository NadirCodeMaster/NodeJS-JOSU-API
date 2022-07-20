const {
    fetchAccessToken, fetchInstagramAccessToken, fetchLinkedinAccessToken, putAccessToken,
} = require('../oauth')

describe.skip('oauth', function () {
    test('fetchAccessToken() - success', async function () {
        await fetchAccessToken()
    })

    test('fetchInstagramAccessToken() - success', async function () {
        await fetchInstagramAccessToken()
    })

    test('fetchLinkedinAccessToken() - success', async function () {
        await fetchLinkedinAccessToken()
    })

    test('putAccessToken() - success', async function () {
        await putAccessToken()
    })
})
