const AWS = require('aws-sdk')
const fetch = require('node-fetch')

const { formatLog } = require('./formatters')
const { logger } = require('./logger')

const {
    API_PASSWORD,
    API_USERNAME,
    AWS_KEY_ID,
    AWS_KEY_SECRET,
    CALENDAR_HOSTNAME,
    SENDER_HOSTNAME,
} = process.env

const s3Handle = new AWS.S3({
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_KEY_SECRET,
})

const creds = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')
const josuHeaders = {
    'Authorization': `Basic ${creds}`,
    'Content-Type': 'application/json',
}

const queryJsonApi = async function (method, endpoint, token, data) {
    const requestHeaders = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    const body = data ? JSON.stringify({ data }) : null

    const response = await fetch(endpoint, { method, headers: requestHeaders, body })
    const responseBody = await response.json()

    const { url, status, statusText, headers } = response
    logger.debug('success', formatLog({ url, status, statusText, headers, body: responseBody }))
    return responseBody
}

const queryCalendarApi = async function (method, endpoint, data) {
    const response = await queryJosuApi(CALENDAR_HOSTNAME, method, endpoint, data)
    logger.debug('success', formatLog({ data: response }))
    return response
}

const querySenderApi = async function (method, endpoint, data) {
    const response = await queryJosuApi(SENDER_HOSTNAME, method, endpoint, data)
    logger.debug('success', formatLog({ data: response }))
    return response
}

const queryJosuApi = async function (host, method, endpoint, data) {
    const requestUrl = new URL(endpoint, host)
    const body = JSON.stringify({ data })

    const response = await fetch(requestUrl, { method, headers: josuHeaders, body })
    const responseBody = await response.json()

    const { url, status, statusText, headers } = response
    logger.debug('success', formatLog({ url, status, statusText, headers, body: responseBody }))
    return responseBody.data
}

const fetchMicrosoftUserpic = async function (account, token) {
    const photoExchange = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (photoExchange.ok) {
        logger.debug('success', formatLog({ photoExchange }))
        return await uploadPublicS3(account, photoExchange)
    }

    const photoAzure = await fetch('https://graph.microsoft.com/beta/users/UserIdOrPrincipalName/photo/$value', {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (photoAzure.ok) {
        logger.debug('success', formatLog({ photoAzure }))
        return await uploadPublicS3(account, photoAzure)
    }
}

const uploadPublicS3 = async function (user, res) {
    const extension = res.headers.get('content-type').match(/^.*\/(?<extension>.+)$/).groups.extension
    const key = `img/userpics/${user.user_id}.${extension}`
    const response = await s3Handle
        .upload({ ACL: 'public-read', Body: res.body, Bucket: 'josu', Key: key })
        .promise()

    logger.debug('success', formatLog({ location: response.Location }))
    return response.Location
}

const uploadS3 = async function (key, data) {
    const response = await s3Handle
        .upload({ Body: data, Bucket: 'josu', Key: key })
        .promise()

    logger.debug('success', formatLog({ location: response.Location }))
    return response.Location
}

const deleteS3 = async function (key) {
    const response = await s3Handle
        .deleteObject({ Key: key, Bucket: 'josu' })
        .promise()

    logger.debug('success', formatLog({ location: response.Location }))
    return response.Location
}

const deleteRecursiveS3 = async function (key) {
    // TODO handle 1000+ items
    const items = await s3Handle
        .listObjectsV2({ Bucket: 'josu', Prefix: key })
        .promise()

    let response
    if (items.Contents.length) {
        response = await s3Handle
            .deleteObjects({
                Bucket: 'josu',
                Delete: { Objects: items.Contents.map(({ Key }) => ({ Key })) },
            })
            .promise()
    }

    logger.debug('success', formatLog({ response }))
    return response
}

module.exports = {
    queryJsonApi,
    queryCalendarApi,
    querySenderApi,
    fetchMicrosoftUserpic,
    uploadS3,
    deleteS3,
    deleteRecursiveS3,
}
