const { dateOr } = require('../helpers/validators')

const {
    deleteUserAccount,
    selectUserAccounts,
    selectUserAccountsByUserId,
    updateUserAccount,
    updateUserAccountsIsActive,
} = require('../models/userAccounts')

const getCreds = async function (req, res) {
    const accounts = await selectUserAccounts(req.params)
    res.json({ data: accounts.rows })
}

const getCredsByUser = async function (req, res) {
    const accounts = await selectUserAccountsByUserId(req.params)
    res.json({ data: accounts.rows })
}

const setAccount = async function (req, res) {
    await updateUserAccount({
        ...req.body.data,
        created: dateOr(req.body.data.created),
        last_sync: dateOr(req.body.data.last_sync),
    })
    res.status(204).json({})
}

const setAccountStatus = async function (req, res) {
    const { account, status } = req.body
    const { id, user_id: userId, provider } = account

    await updateUserAccountsIsActive(provider, id, userId, status)
    res.json({ data: { ...account, is_active: status } })
}

const removeUserAccount = async function (req, res) {
    const { account } = req.body
    const { id, user_id: userId, provider, account_nickname: accountNickname } = account
    await deleteUserAccount(id, userId, provider, accountNickname)
    res.json({ data: { id, provider, account_nickname: accountNickname } })
}

const setSocialLastSynced = async function (req, res) {
    const { id, userId, lastSync, provider } = req.body
    const accounts = await updateUserAccount({
        provider,
        id,
        user_id: userId,
        account_nickname: null,
        created: null,
        is_active: true,
        last_sync: dateOr(lastSync),
    })
    res.json({ data: accounts })
}

module.exports = {
    getCreds,
    getCredsByUser,
    removeUserAccount,
    setAccount,
    setAccountStatus,
    setSocialLastSynced,
}
