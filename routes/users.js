const express = require('express')

const { dropUserAccount } = require('../controllers/users/account')
const { dropUserDevice, putUserDevice } = require('../controllers/users/device')
const { dropUserProfile } = require('../controllers/users/profile')
const { getUser, getUsers, putUser } = require('../controllers/users/users')
const { putUserAutojoin } = require('../controllers/users/autojoin')
const { putUserPassword } = require('../controllers/users/password')
const { putUserUsername } = require('../controllers/users/username')

const { isAuthenticated } = require('../controllers/isAuthenticated')
const { isConsistentUser } = require('../controllers/isConsistentUser')
const { logRequest } = require('../controllers/logging')

const usersRouter = new express.Router()

/**
 * @swagger
 * /v0/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - users
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: '#/components/parameters/FetchSize'
 *       - $ref: '#/components/parameters/PageState'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_User'
 */
usersRouter.get('/', logRequest, isAuthenticated, getUsers)

/**
 * @swagger
 * /v0/users/{user_id}:
 *   get:
 *     summary: Get user by user_id
 *     tags:
 *       - users
 *     security:
 *       - Basic: []
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_User'
 *   put:
 *     summary: Update user
 *     tags:
 *       - users
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/User'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
usersRouter.get('/:user_id', logRequest, isAuthenticated, getUser)
usersRouter.put('/:user_id', logRequest, isAuthenticated, putUser)

/**
 * @swagger
 * /v0/users/{user_id}/account:
 *   delete:
 *     summary: Delete account
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserAccount'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
usersRouter.delete('/:user_id/account', logRequest, isAuthenticated, isConsistentUser, dropUserAccount)

/**
 * @swagger
 * /v0/users/{user_id}/autojoin:
 *   put:
 *     summary: Update account autojoin
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserAutojoin'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
usersRouter.put('/:user_id/autojoin', logRequest, isAuthenticated, isConsistentUser, putUserAutojoin)

/**
 * @swagger
 * /v0/users/{user_id}/device:
 *   put:
 *     summary: Add device
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserDevice'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 *   delete:
 *     summary: Delete device
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserDevice'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
usersRouter.put('/:user_id/device', logRequest, isAuthenticated, isConsistentUser, putUserDevice)
usersRouter.delete('/:user_id/device', logRequest, isAuthenticated, isConsistentUser, dropUserDevice)

/**
 * @swagger
 * /v0/users/{user_id}/password:
 *   put:
 *     summary: Update password
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserPassword'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
usersRouter.put('/:user_id/password', logRequest, isAuthenticated, isConsistentUser, putUserPassword)

/**
 * @swagger
 * /v0/users/{user_id}/profile:
 *   delete:
 *     summary: Delete profile
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
usersRouter.delete('/:user_id/profile', logRequest, isAuthenticated, isConsistentUser, dropUserProfile)

/**
 * @swagger
 * /v0/users/{user_id}/username:
 *   put:
 *     summary: Update username
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserUsername'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
usersRouter.put('/:user_id/username', logRequest, isAuthenticated, isConsistentUser, putUserUsername)

module.exports = usersRouter
