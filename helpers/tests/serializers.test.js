const {
    copy,
    serializeDunderFields,
    deserializeDunderFields,
    serializeObjectFields,
    deserializeObjectFields,
} = require('../serializers')

describe('serializers', function () {
    test('copy() -> success', function () {
        const response = copy({ test: 'test' })
        expect(response).toStrictEqual({ test: 'test' })
    })

    test('serializeDunderFields() -> success', function () {
        const response = serializeDunderFields({
            normal_field: 'test',
            __dunder_field: { test: '{"test":"test"}' },
        })
        expect(response).toStrictEqual({
            normal_field: 'test',
            __dunder_field: { test: { test: 'test' } },
        })
    })

    test('deserializeDunderFields() -> success', function () {
        const response = deserializeDunderFields({
            normal_field: 'test',
            __dunder_field: { test: { test: 'test' } },
        })
        expect(response).toStrictEqual({
            normal_field: 'test',
            __dunder_field: { test: '{"test":"test"}' },
        })
    })

    test('serializeObjectFields() -> success', function () {
        const response = serializeObjectFields({ test: '{"test":"test"}' })
        expect(response).toStrictEqual({ test: { test: 'test' } })
    })

    test('deserializeObjectFields() -> success', function () {
        const response = deserializeObjectFields({ test: { test: 'test' } })
        expect(response).toStrictEqual({ test: '{"test":"test"}' })
    })
})
