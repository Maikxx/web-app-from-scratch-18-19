import { Transformer } from '../client/src/ts/utils/Transformer'

describe('Transformer', () => {
    it('Should capitalize a string correctly.', () => {
        const result = Transformer.capitalize('test')

        expect(result).toEqual('Test')
    })

    it('Should flatten an array of arrays to a single level.', () => {
        const testData = [[ 1, 2, 3 ], [ 2, 4, 5, [ 2, 1 ]]]
        const result = Transformer.flattenDeep(testData)

        expect(result).toEqual([ 1, 2, 3, 2, 4, 5, 2, 1 ])
    })

    it('Should add an id to an object.', () => {
        const result = Transformer.addIdToObject('1', { string: 'test' })

        expect(result).toEqual({ id: '1', string: 'test' })
    })

    it('Should remove falsy values from an array on a deep level.', () => {
        const testData = [ false, null, [], true, [ false, true, { falsy: false, truthy: true } ]]
        const result = Transformer.deepCleanArray(testData)

        expect(result).toEqual([ true, [ true, { truthy: true } ]])
    })

    it('Should remove falsy values from an object on a deep level.', () => {
        const testData = { id: '1', fakeString: 'false', emptyArray: [] }
        const result = Transformer.deepCleanObject(testData)

        expect(result).toEqual({ id: '1', fakeString: 'false' })
    })
})
