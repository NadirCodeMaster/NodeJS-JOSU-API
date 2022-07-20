const { readInChunks, sleep } = require('../paginators')

describe('paginators', function () {
    test.skip('readInChunks() - success', async function () {
        const response = await readInChunks()
        expect(response).toBe(undefined)
    })

    test('sleep() - success', async function () {
        const response = await sleep(100)
        expect(response).toBe(undefined)
    })
})
