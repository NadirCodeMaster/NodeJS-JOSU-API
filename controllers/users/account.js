const { deleteAccountData } = require('./pipelines')

const dropUserAccount = async function (req, res, next) {
    await deleteAccountData(req.body.data.account, req.body.data.user)
    res.locals.resource = req.originalUrl.replace('/account', '')
    return next()
}

module.exports = { dropUserAccount }
