const express = require('express')
const path = require('path')

const { logRequest } = require('../controllers/logging')

const specRouter = new express.Router()
const specPath = path.join(path.resolve(__dirname, '..'), 'openapi.yml')

/**
 * @swagger
 * /v0/spec:
 *   get:
 *     summary: OpenApi specification
 *     tags:
 *       - spec
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Static'
 */
specRouter.get('/', logRequest, express.static(specPath))

module.exports = specRouter
