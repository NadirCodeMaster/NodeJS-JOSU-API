const R = require('ramda')
const { WRITE_PAGE, WRITE_TIMEOUT } = require('./config')

const readInChunks = async function (handler, ...params) {
    let rows = []
    let pageState

    do {
        const result = await handler(...params, { pageState })
        rows = rows.concat(result.rows)
        pageState = result.pageState
    } while (pageState)

    return { rows }
}

/* Could be used for INSERT, UPDATE, and DELETE operations. */
const writeInChunks = async function (batch, handler) {
    const chunks = R.splitEvery(WRITE_PAGE, batch)
    for (const chunk of chunks) {
        await Promise.all(chunk.map(handler))
        if (chunk.length === WRITE_PAGE) {
            await sleep(WRITE_TIMEOUT)
        }
    }
}

const sleep = async function (timeout) {
    return await new Promise(resolve => setTimeout(resolve, timeout))
}

module.exports = { readInChunks, writeInChunks, sleep }
