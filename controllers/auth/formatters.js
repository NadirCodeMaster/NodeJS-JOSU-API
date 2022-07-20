const uuid = require('uuid')
const { copy } = require('../../helpers/serializers')
const { formatLog } = require('../../helpers/formatters')
const { logger } = require('../../helpers/logger')

const addAccountGoogle = function (user, account, tokens) {
    const newUser = copy(user)
    const newAccount = formatAccountGoogle(account, tokens)
    newUser.__accounts_google[account.id] = newAccount
    logger.debug('Google account added', formatLog({ newAccount, newUser }))
    return newUser
}

const addAccountMicrosoft = function (user, account, tokens) {
    const newUser = copy(user)
    const newAccount = formatAccountMicrosoft(account, tokens)
    newUser.__accounts_microsoft[account.id] = newAccount
    logger.debug('Google account added', formatLog({ newAccount, newUser }))
    return newUser
}

const formatUserGoogle = function (account, tokens) {
    return {
        user_id: uuid.v4(),
        __accounts_google: { [account.id]: formatAccountGoogle(account, tokens) },
        __accounts_microsoft: {},
        __calendars_google: {},
        __calendars_microsoft: {},
        autojoin_zoom: false,
        devices: [],
        email: account.email,
        first_name: account.given_name,
        last_name: account.family_name,
        password: null,
        profile_id: null,
        username: null,
        userpic_url: account.picture,
    }
}

const formatUserMicrosoft = function (account, tokens) {
    return {
        user_id: uuid.v4(),
        __accounts_google: {},
        __accounts_microsoft: { [account.id]: formatAccountMicrosoft(account, tokens) },
        __calendars_google: {},
        __calendars_microsoft: {},
        autojoin_zoom: false,
        devices: [],
        email: account.userPrincipalName,
        first_name: account.givenName,
        last_name: account.surname,
        password: null,
        profile_id: null,
        username: null,
        userpic_url: null,
    }
}

const formatAccountGoogle = function (account, tokens) {
    return {
        id: account.id,
        autojoin_zoom: false,
        email: account.email,
        first_name: account.given_name,
        last_name: account.family_name,
        name: account.name,
        provider: 'google',
        refresh_token: tokens.refresh_token,
    }
}

const formatAccountMicrosoft = function (account, tokens) {
    return {
        id: account.id,
        autojoin_zoom: false,
        email: account.userPrincipalName,
        first_name: account.givenName,
        last_name: account.surname,
        name: account.displayName,
        provider: 'microsoft',
        refresh_token: tokens.refresh_token,
    }
}

const formatProfile = function (user) {
    const email = user.email
    const name = [user.first_name, user.last_name].join(' ')
    return {
        profile_id: uuid.v4(),
        email,
        emails: [email],
        name,
        names: [name],
    }
}

module.exports = {
    addAccountGoogle,
    addAccountMicrosoft,
    formatAccountGoogle,
    formatAccountMicrosoft,
    formatUserGoogle,
    formatUserMicrosoft,
    formatProfile,
}
