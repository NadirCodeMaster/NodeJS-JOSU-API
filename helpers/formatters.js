const { API_HOSTNAME } = process.env

const HELPER_HANDLERS = [
    'isAuthenticated',
    'isConsistentUser',
    'logRequest',
    'logResponse',
    'oauthRedirect',
    'wrapResponse',
]

const formatLog = function (data) {
    return { handler: formatLog.caller.name, context: data }
}

const formatResponse = function (response, req) {
    return {
        links: {
            self: getSelfUrl(req),
            next: getNextUrl(response, req),
        },
        data: response.rows,
    }
}

const getSelfUrl = function (req) {
    const { originalUrl, protocol, hostname } = req
    return new URL(originalUrl, `${protocol}://${hostname}`)
}

const getNextUrl = function (response, req) {
    const { pageState } = response
    const url = getSelfUrl(req)
    if (pageState && pageState !== url.searchParams.get('pageState')) {
        url.searchParams.set('pageState', pageState)
        return url
    }
}

const getRedirectUri = function (req) {
    const { baseUrl, path } = req
    return { redirect_uri: `${API_HOSTNAME}${baseUrl}${path}` }
}

const getHandler = function (req) {
    if (req.route) {
        const handlers = req.route.stack
            .map(x => x.name)
            .filter(x => !HELPER_HANDLERS.includes(x))
        return handlers[handlers.length - 1]
    }
}

const padHandler = function (handler) {
    return (handler + '()').padEnd(16)
}

module.exports = { formatLog, formatResponse, getRedirectUri, getHandler, padHandler }
