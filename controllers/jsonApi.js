require('../helpers/dotenv')

const { copy } = require('../helpers/serializers')
const { orObject } = require('../helpers/combinators')

const { API_HOSTNAME } = process.env

const wrapResponse = function (req, res, next) {
    res.status(req.method === 'GET' ? 200 : 202)
    res.locals.body = {
        links: {
            self: getSelfUrl(req),
            next: getNextUrl(req, res),
            resource: getResourceUrl(res),
        },
        data: res.locals.payload ? copy(res.locals.payload) : null,
    }
    return next()
}

const getSelfUrl = function (req) {
    return new URL(req.originalUrl, API_HOSTNAME).toString()
}

const getNextUrl = function (req, res) {
    const { pageState } = orObject(res.locals.resultSet)
    const url = new URL(getSelfUrl(req))
    if (pageState && pageState !== url.searchParams.get('pageState')) {
        url.searchParams.set('pageState', pageState)
        return url.toString()
    }
}

const getResourceUrl = function (res) {
    const { resource } = res.locals
    return resource
        ? new URL(resource, API_HOSTNAME).toString()
        : undefined
}

module.exports = { wrapResponse, getNextUrl, getSelfUrl, getResourceUrl }
