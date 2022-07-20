const express = require('express')

const {
    createProfile,
    getProfile,
    getProfileEmail,
    putProfileIdentity,
    dropProfile,
    dropProfileIdentity,
} = require('../controllers/profiles/profiles')

const { isAuthenticated } = require('../controllers/isAuthenticated')
const { logRequest } = require('../controllers/logging')

const profilesRouter = new express.Router()

/**
 * @swagger
 * /v0/profiles:
 *   post:
 *     summary: Create profile
 *     tags:
 *       - profiles
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Profile'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 *   get:
 *     summary: Get profile by email
 *     tags:
 *       - profiles
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: '#/components/parameters/Email'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Profile'
 */
profilesRouter.post('/', logRequest, isAuthenticated, createProfile)
profilesRouter.get('/', logRequest, isAuthenticated, getProfileEmail)

/**
 * @swagger
 * /v0/profiles/{profile_id}:
 *   get:
 *     summary: Get profile
 *     tags:
 *       - profiles
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProfileId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Profile'
 *   delete:
 *     summary: Delete profile
 *     tags:
 *       - profiles
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProfileId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/Profile'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
profilesRouter.get('/:profile_id', logRequest, isAuthenticated, getProfile)
profilesRouter.delete('/:profile_id', logRequest, isAuthenticated, dropProfile)

/**
 * @swagger
 * /v0/profiles/{profile_id}/identity:
 *   put:
 *     summary: Update profile identity
 *     tags:
 *       - profiles
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProfileId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/ProfileIdentity'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 *   delete:
 *     summary: Delete profile identity
 *     tags:
 *       - profiles
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProfileId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/ProfileIdentity'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
profilesRouter.put('/:profile_id/identity', logRequest, isAuthenticated, putProfileIdentity)
profilesRouter.delete('/:profile_id/identity', logRequest, isAuthenticated, dropProfileIdentity)

module.exports = profilesRouter
