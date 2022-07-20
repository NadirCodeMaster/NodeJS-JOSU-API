const { CHUNK_SIZE } = process.env

const READ_PAGE = CHUNK_SIZE
const WRITE_PAGE = CHUNK_SIZE
const WRITE_TIMEOUT = 500 // milliseconds

module.exports = { READ_PAGE, WRITE_PAGE, WRITE_TIMEOUT }
