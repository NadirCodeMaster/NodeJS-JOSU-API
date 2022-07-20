const express = require('express')

const {
    createMeeting,
    getMeetings,
    getMeeting,
    putMeeting,
    dropMeeting,
} = require('../controllers/meetings/meetings')

const { isAuthenticated } = require('../controllers/isAuthenticated')
const { logRequest } = require('../controllers/logging')

const meetingsRouter = new express.Router()

/**
 * @swagger
 * /v0/meetings:
 *   post:
 *     summary: Create meeting
 *     tags:
 *       - meetings
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Meeting'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
meetingsRouter.post('/', logRequest, isAuthenticated, createMeeting)

/**
 * @swagger
 * /v0/meetings/{user_id}:
 *   get:
 *     summary: Get meetings
 *     tags:
 *       - meetings
 *     security:
 *       - Basic: []
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/After'
 *       - $ref: '#/components/parameters/Before'
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/FetchSize'
 *       - $ref: '#/components/parameters/PageState'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Meeting'
 */
meetingsRouter.get('/:user_id', logRequest, isAuthenticated, getMeetings)

/**
 * @swagger
 * /v0/meetings/{user_id}/{start}/{id}:
 *   get:
 *     summary: Get meeting
 *     tags:
 *       - meetings
 *     security:
 *       - Basic: []
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/Start'
 *       - $ref: '#/components/parameters/MeetingId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Meeting'
 *   put:
 *     summary: Update meeting
 *     tags:
 *       - meetings
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Meeting'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/Start'
 *       - $ref: '#/components/parameters/MeetingId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 *   delete:
 *     summary: Delete meeting
 *     tags:
 *       - meetings
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/Start'
 *       - $ref: '#/components/parameters/MeetingId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_Accepted'
 */
meetingsRouter.get('/:user_id/:start/:id', logRequest, isAuthenticated, getMeeting)
meetingsRouter.put('/:user_id/:start/:id', logRequest, isAuthenticated, putMeeting)
meetingsRouter.delete('/:user_id/:start/:id', logRequest, isAuthenticated, dropMeeting)

module.exports = meetingsRouter
