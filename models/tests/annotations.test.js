const faker = require('faker')

const { cassandraCursor } = require('../../helpers/cassandra')
const {
    insertAnnotations,
    selectAnnotations,
    selectAnnotationsByRecording,
    selectAnnotationsBySpeaker,
    deleteAnnotations,
} = require('../annotations')

describe.skip('annotations', function () {
    beforeEach(() => faker.seed(1))
    afterAll(async () => await cassandraCursor.shutdown())

    test('insertAnnotations() - success', async function () {
        await insertAnnotations()
    })

    test('selectAnnotations() - success', async function () {
        await selectAnnotations()
    })

    test('selectAnnotationsByRecording() - success', async function () {
        await selectAnnotationsByRecording()
    })

    test('selectAnnotationsBySpeaker() - success', async function () {
        await selectAnnotationsBySpeaker()
    })

    test('deleteAnnotations() - success', async function () {
        await deleteAnnotations()
    })
})
