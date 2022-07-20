const { Error403, DIFFERENT_USER } = require('../helpers/errors')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const isConsistentUser = function (req, res, next) {
    const authId = req.auth?.user_id
    const paramsId = req.params?.user_id
    const bodyId = req.body?.data?.user?.user_id

    const ids = [authId, paramsId, bodyId].filter(x => x)
    const isConsistent = ids.every(x => x === ids[0])

    if (isConsistent) {
        logger.debug('success', formatLog({ authId, paramsId, bodyId, ids, isConsistent }))
        return next()
    } else {
        throw new Error403(DIFFERENT_USER)
    }
}

module.exports = { isConsistentUser }
