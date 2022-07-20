const fs = require('fs')
const jsYaml = require('js-yaml')
const openApiValidator = require('express-openapi-validator')
const swaggerJSDoc = require('swagger-jsdoc')

const openApiSpec = swaggerJSDoc({
    swaggerDefinition: {
        'openapi': '3.0.0',
        'info': { title: 'api.josu.ai', version: '0.2.0' },
        'x-tagGroups': [{
            name: 'Auth',
            tags: ['connect', 'login', 'password', 'query'],
        }, {
            name: 'Meetings',
            tags: ['meetings'],
        }, {
            name: 'Profiles',
            tags: ['profiles'],
        }, {
            name: 'Spec',
            tags: ['spec'],
        }, {
            name: 'Users',
            tags: ['users'],
        }, {
            name: 'Legacy',
            tags: [
                'accounts',
                'analytics',
                'annotations',
                'auth',
                'channels',
                'emails',
                'emotions',
                'gmail',
                'messages',
                'outlook',
                'queue',
                'recording',
                'recordings',
                'social',
                'speaker',
                'topics',
                'twitter',
                'workspaces',
            ],
        }],
    },
    apis: ['routes/*.js', 'schemas/*.yml', 'schemas/common/*.yml'],
})

const ymlSpec = jsYaml.dump(openApiSpec)
fs.writeFileSync('openapi.yml', ymlSpec)

const validator = openApiValidator.middleware({
    apiSpec: './openapi.yml',
    validateResponses: true,
})

module.exports = { validator }
