const express = require('express')

const { connectGoogle } = require('../controllers/auth/connect.google')
const { connectMicrosoft } = require('../controllers/auth/connect.microsoft')
const { loginGoogle } = require('../controllers/auth/login.google')
const { loginMicrosoft } = require('../controllers/auth/login.microsoft')
const { loginPassword } = require('../controllers/auth/login.password')
const { logout } = require('../controllers/auth/logout')
const { lookupAccount } = require('../controllers/auth/lookup.account')
const { lookupUsername } = require('../controllers/auth/lookup.username')
const { passwordReset } = require('../controllers/auth/password.reset')
const { passwordResetToken } = require('../controllers/auth/password.reset.token')

const {
    createInstagramAccount,
    createLinkedinAccount,
    createSlackAccount,
    createTwitterAccount,
    createZoomAccount,
    register,
} = require('../controllers/auth/legacy')

const { logRequest, logResponse } = require('../controllers/logging')
const { oauthRedirect } = require('../controllers/oauthRedirect')
const { wrapResponse } = require('../controllers/jsonApi')

const authRouter = new express.Router()

/**
 * @swagger
 * /v0/auth/connect/google/{platform}:
 *   get:
 *     summary: Connect Google account
 *     tags:
 *       - connect
 *     parameters:
 *       - $ref: "#/components/parameters/Code"
 *       - $ref: "#/components/parameters/HD"
 *       - $ref: "#/components/parameters/Platform"
 *       - $ref: "#/components/parameters/Prompt"
 *       - $ref: "#/components/parameters/RedirectURI"
 *       - $ref: "#/components/parameters/Scope"
 *       - $ref: "#/components/parameters/State"
 *       - $ref: "#/components/parameters/User"
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted_Auth'
 */
authRouter.get('/connect/google/:platform', logRequest, connectGoogle, oauthRedirect)

/**
 * @swagger
 * /v0/auth/connect/microsoft/{platform}:
 *   get:
 *     summary: Connect Microsoft account
 *     tags:
 *       - connect
 *     parameters:
 *       - $ref: "#/components/parameters/Code"
 *       - $ref: "#/components/parameters/Platform"
 *       - $ref: "#/components/parameters/State"
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted_Auth'
 */
authRouter.get('/connect/microsoft/:platform', logRequest, connectMicrosoft, oauthRedirect)

/**
 * @swagger
 * /v0/auth/login/google/{platform}:
 *   get:
 *     summary: Login with Google account
 *     tags:
 *       - login
 *     parameters:
 *       - $ref: "#/components/parameters/Code"
 *       - $ref: "#/components/parameters/HD"
 *       - $ref: "#/components/parameters/Platform"
 *       - $ref: "#/components/parameters/Prompt"
 *       - $ref: "#/components/parameters/RedirectURI"
 *       - $ref: "#/components/parameters/Scope"
 *       - $ref: "#/components/parameters/User"
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted_Auth'
 */
authRouter.get('/login/google/:platform', logRequest, loginGoogle, oauthRedirect)

/**
 * @swagger
 * /v0/auth/login/microsoft/{platform}:
 *   get:
 *     summary: Login with Microsoft account
 *     tags:
 *       - login
 *     parameters:
 *       - $ref: "#/components/parameters/Code"
 *       - $ref: "#/components/parameters/Platform"
 *       - $ref: "#/components/parameters/SessionState"
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted_Auth'
 */
authRouter.get('/login/microsoft/:platform', logRequest, loginMicrosoft, oauthRedirect)

/**
 * @swagger
 * /v0/auth/login/password:
 *   post:
 *     summary: Login with password
 *     tags:
 *       - login
 *     requestBody:
 *       $ref: "#/components/requestBodies/PasswordLogin"
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted_Auth'
 */
authRouter.post('/login/password', logRequest, loginPassword, wrapResponse, logResponse)

/**
 * @swagger
 * /v0/auth/logout:
 *   post:
 *     summary: Logout
 *     tags:
 *       - login
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted_Auth'
 */
authRouter.post('/logout', logRequest, logout, wrapResponse, logResponse)

/**
 * @swagger
 * /v0/auth/lookup/{account}/account:
 *   get:
 *     summary: Lookup account
 *     tags:
 *       - query
 *     parameters:
 *       - $ref: '#/components/parameters/Account'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Auth'
 */
authRouter.get('/lookup/:account/account', logRequest, lookupAccount, wrapResponse, logResponse)

/**
 * @swagger
 * /v0/auth/lookup/{username}/username:
 *   get:
 *     summary: Lookup username
 *     tags:
 *       - query
 *     parameters:
 *       - $ref: '#/components/parameters/Username'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Auth'
 */
authRouter.get('/lookup/:username/username', logRequest, lookupUsername, wrapResponse, logResponse)

/**
 * @swagger
 * /v0/auth/password/reset:
 *   post:
 *     summary: Create reset password link
 *     tags:
 *       - password
 *     requestBody:
 *       $ref: "#/components/requestBodies/PasswordReset"
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted_Auth'
 */
authRouter.post('/password/reset', logRequest, passwordReset, wrapResponse, logResponse)

/**
 * @swagger
 * /v0/auth/password/reset/{reset_token}:
 *   get:
 *     summary: Reset password
 *     tags:
 *       - password
 *     parameters:
 *       - $ref: "#/components/parameters/ResetToken"
 *     responses:
 *       302:
 *         $ref: '#/components/responses/302_Found_Auth'
 */
authRouter.get('/password/reset/:reset_token', logRequest, passwordResetToken)

/* --- LEGACY --- */

/**
 * @swagger
 * /v0/auth/register:
 *   post:
 *     summary: User registration
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 pattern: '^[a-zA-Z0-9\!\?_\+]+$'
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 16
 *                 pattern: '^[a-zA-Z0-9]+$'
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 16
 *                 pattern: '^[a-zA-Z0-9]+$'
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *     responses:
 *       201:
 *         description: Success
 */
authRouter.route('/register')
    .post(register)

/**
 * @swagger
 * /v0/auth/legacy/{provider}:
 *   get:
 *     summary: Generic OAuth2 endpoint for data connection provider
 *     tags:
 *       - auth
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - gmail
 *             - googlecalendar
 *             - instagram
 *             - linkedin
 *             - microsoftcalendar
 *             - outlook
 *             - zoom
 *         description: Data provider
 *       - $ref: "#/components/parameters/Code"
 *       - $ref: "#/components/parameters/HD"
 *       - $ref: "#/components/parameters/Prompt"
 *       - $ref: "#/components/parameters/RedirectURI"
 *       - $ref: "#/components/parameters/Scope"
 *       - $ref: "#/components/parameters/User"
 *     responses:
 *       200:
 *         description: Success
 */
authRouter.route('/instagram')
    .get(createInstagramAccount)

authRouter.route('/linkedin')
    .get(createLinkedinAccount)

authRouter.route('/zoom')
    .get(createZoomAccount)

/**
 * @swagger
 * /v0/auth/slack:
 *   get:
 *     summary: OAuth2 endpoint for Slack
 *     tags:
 *       - auth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: OAuth2 code
 *       - in: query
 *         name: state
 *         allowEmptyValue: true
 *         schema:
 *           type: string
 *         description: Additional security parameter for OAuth2
 *     responses:
 *       200:
 *         description: Success
 */
authRouter.route('/slack')
    .get(createSlackAccount)

/**
 * @swagger
 * /v0/auth/twitter:
 *   post:
 *     summary: OAuth2 endpoint for Twitter
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oauth_token:
 *                 type: string
 *               oauth_token_secret:
 *                 type: string
 *               account_nickname:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - oauth_token
 *               - oauth_token_secret
 *               - account_nickname
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
authRouter.route('/twitter')
    .post(createTwitterAccount)

module.exports = authRouter
