const { encodeForm } = require('./encoders')

const {
    API_HOSTNAME,
    GOOGLE_CALENDAR_CLIENT_ID,
    GOOGLE_CALENDAR_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_GMAIL_CLIENT_ID,
    GOOGLE_GMAIL_CLIENT_SECRET,
    INSTAGRAM_CLIENT_ID,
    INSTAGRAM_CLIENT_SECRET,
    LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET,
    MICROSOFT_CALENDAR_CLIENT_ID,
    MICROSOFT_CALENDAR_CLIENT_SECRET,
    MICROSOFT_CLIENT_ID,
    MICROSOFT_CLIENT_SECRET,
    OUTLOOK_CLIENT_ID,
    OUTLOOK_CLIENT_SECRET,
    SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET,
} = process.env

const OAUTH_PROVIDERS = {
    gmail: {
        tokenUrl: 'https://oauth2.googleapis.com/token',
        tokenParams: {
            client_id: GOOGLE_GMAIL_CLIENT_ID,
            client_secret: GOOGLE_GMAIL_CLIENT_SECRET,
            redirect_uri: `${API_HOSTNAME}/auth/gmail`,
            grant_type: 'authorization_code',
        },
        tokenEncoder: JSON.stringify,
    },
    google: {
        tokenUrl: new URL('/token', 'https://oauth2.googleapis.com'),
        tokenParams: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            grant_type: 'authorization_code',
        },
        tokenEncoder: JSON.stringify,
    },
    googlecalendar: {
        tokenUrl: 'https://oauth2.googleapis.com/token',
        tokenParams: {
            client_id: GOOGLE_CALENDAR_CLIENT_ID,
            client_secret: GOOGLE_CALENDAR_CLIENT_SECRET,
            redirect_uri: `${API_HOSTNAME}/auth/googlecalendar`,
            grant_type: 'authorization_code',
        },
        tokenEncoder: JSON.stringify,
    },
    instagram: {
        tokenUrl: 'https://api.instagram.com/oauth/access_token',
        tokenParams: {
            client_id: INSTAGRAM_CLIENT_ID,
            client_secret: INSTAGRAM_CLIENT_SECRET,
            redirect_uri: `${API_HOSTNAME}/auth/instagram`,
            grant_type: 'authorization_code',
        },
        tokenEncoder: encodeForm,
    },
    linkedin: {
        tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
        tokenParams: {
            client_id: LINKEDIN_CLIENT_ID,
            client_secret: LINKEDIN_CLIENT_SECRET,
            redirect_uri: `${API_HOSTNAME}/auth/linkedin`,
        },
        tokenEncoder: encodeForm,
    },
    microsoft: {
        tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        tokenParams: {
            client_id: MICROSOFT_CLIENT_ID,
            client_secret: MICROSOFT_CLIENT_SECRET,
            grant_type: 'authorization_code',
        },
        tokenEncoder: encodeForm,
    },
    microsoftcalendar: {
        tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        tokenParams: {
            client_id: MICROSOFT_CALENDAR_CLIENT_ID,
            client_secret: MICROSOFT_CALENDAR_CLIENT_SECRET,
            redirect_uri: `${API_HOSTNAME}/auth/microsoftcalendar`,
            grant_type: 'authorization_code',
        },
        tokenEncoder: encodeForm,
    },
    outlook: {
        tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        tokenParams: {
            client_id: OUTLOOK_CLIENT_ID,
            client_secret: OUTLOOK_CLIENT_SECRET,
            redirect_uri: `${API_HOSTNAME}/auth/outlook`,
            grant_type: 'authorization_code',
        },
        tokenEncoder: encodeForm,
    },
    slack: {
        tokenUrl: 'https://slack.com/api/oauth.v2.access',
        tokenParams: {
            client_id: SLACK_CLIENT_ID,
            client_secret: SLACK_CLIENT_SECRET,
            redirect_uri: `${API_HOSTNAME}/auth/slack`,
        },
        tokenEncoder: encodeForm,
    },
}

module.exports = { OAUTH_PROVIDERS }
