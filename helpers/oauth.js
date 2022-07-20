const fetch = require('node-fetch')
const uuid = require('uuid')
const FormData = require('form-data')

const { OAUTH_PROVIDERS } = require('./providers')
const { formatLog } = require('./formatters')
const { getRedirectUri } = require('./formatters')
const { insertUserAccounts } = require('../models/userAccounts')
const { logger } = require('./logger')

const exchangeRefreshToken = async function (account, provider) {
    const { tokenUrl, tokenEncoder, tokenParams } = OAUTH_PROVIDERS[provider]
    const body = tokenEncoder({
        ...tokenParams,
        grant_type: 'refresh_token',
        refresh_token: account.refresh_token,
    })
    const response = await fetch(tokenUrl, { method: 'POST', body })
    const responseBody = await response.json()

    const { url, status, statusText, headers } = response
    logger.debug('success', formatLog({ url, status, statusText, headers, body: responseBody }))
    return responseBody
}

const fetchAccessToken = async function (req, provider) {
    const { code } = req.query
    const { tokenUrl, tokenEncoder, tokenParams } = OAUTH_PROVIDERS[provider]

    const response = await fetch(tokenUrl, {
        method: 'POST',
        body: tokenEncoder({ ...tokenParams, code, ...getRedirectUri(req) }),
    })
    const responseBody = await response.json()

    const { url, status, statusText, headers } = response
    logger.debug('success', formatLog({ url, status, statusText, headers, body: responseBody }))
    return responseBody
}

const revokeRefreshToken = async function (token) {
    const { tokenUrl } = OAUTH_PROVIDERS['google']
    const requestUrl = new URL('/revoke', tokenUrl)
    requestUrl.searchParams.set('token', token)

    const response = await fetch(requestUrl, { method: 'POST' })
    const responseBody = await response.json()

    const { url, status, statusText, headers } = response
    logger.debug('success', formatLog({ url, status, statusText, headers, body: responseBody }))
    return responseBody
}

/* LEGACY */

const fetchAccessTokenLegacy = async function (req, provider) {
    const { code } = req.query
    const { tokenUrl, tokenEncoder, tokenParams } = OAUTH_PROVIDERS[provider]
    const response = await fetch(tokenUrl, {
        method: 'POST',
        body: tokenEncoder({ ...tokenParams, code }),
    })
    return await response.json()
}

const fetchInstagramAccessToken = async function (req, provider) {
    const { code, redirect_uri: redirectUri } = req.query
    const { tokenUrl, tokenParams } = OAUTH_PROVIDERS[provider]
    const formData = new FormData()
    formData.append('code', code)
    formData.append('grant_type', 'authorization_code')
    const keys = Object.keys(tokenParams)
    keys.forEach((key) => {
        formData.append(key, tokenParams[key])
    })
    formData.append('redirect_uri', redirectUri)

    const response = await fetch(tokenUrl, {
        method: 'POST',
        body: formData,
    })
    return await response.json()
}

const fetchLinkedinAccessToken = async function (req, provider) {
    const { code, redirect_uri: redirectUri } = req.query
    const { tokenUrl, tokenParams } = OAUTH_PROVIDERS[provider]
    // eslint-disable-next-line max-len
    const url = `${tokenUrl}?grant_type=authorization_code&client_id=${tokenParams['client_id']}&client_secret=${tokenParams['client_secret']}&code=${code}&redirect_uri=${redirectUri}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
    })
    return await response.json()
}

const putAccessToken = async function (userId, accountNickname, refreshToken, provider) {
    const id = uuid.v4()
    const created = new Date()
    const isActive = true
    const lastSync = null

    return await insertUserAccounts(
        provider, id, userId, accountNickname, created, isActive, lastSync, refreshToken,
    )
}

module.exports = {
    exchangeRefreshToken,
    fetchAccessToken,
    revokeRefreshToken,
    /* LEGACY */
    fetchAccessTokenLegacy,
    fetchInstagramAccessToken,
    fetchLinkedinAccessToken,
    putAccessToken,
}
