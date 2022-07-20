const { selectAccount } = require('../../models/accounts')

const lookupAccount = async function (req, res, next) {
    res.locals.resultSet = await selectAccount(req.params)
    res.locals.payload = res.locals.resultSet.rows?.[0]
    return next()
}

module.exports = { lookupAccount }
