const oauthRedirect = async function (req, res) {
    const { platform } = req.params
    const { account, jwtToken, user } = res.locals

    switch (platform) {
        case 'mobile':
            return res.send(`
                <script>
                    document.location.href = 'http://auth.expo.io/@simon923/Josu?'
                        + 'user=${encodeURIComponent(JSON.stringify({ account, jwtToken, user }))}'
                </script>
            `)
        case 'web':
            return res.send(`
                <script>
                    const params = {
                        data: ${JSON.stringify({ account, jwtToken, user })},
                    }
                    if (window.opener) {
                         window.opener.postMessage(params, '*')
                    }
                </script>
            `)
    }
}

module.exports = { oauthRedirect }
