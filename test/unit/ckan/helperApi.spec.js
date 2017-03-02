import { expect } from 'chai'
import HelperApi from '../../../src/lib/ckan/helperApi'

describe('CKAN Helper Api', () => {
  const helperApi = HelperApi()
  const config = {
    apiUrl: '',
    parameters: []
  }
  describe('function limit', () => {
    it('without arguments should set limit to 5', () => {
      // setup
      const thisConfig = Object.assign({}, config)
      const limit = helperApi.limit()

      // expected value
      const expected = {limit: 5}

      // actual value
      const actual = limit(thisConfig).parameters

      // assert
      expect(actual).to.deep.equal(expected)
    })

    it('with number argument should set limit to number', () => {
      // setup
      const argument = 10
      const thisConfig = Object.assign({}, config)
      const limit = helperApi.limit(argument)

      // expected value
      const expected = {limit: 10}

      // actual value
      const actual = limit(thisConfig).parameters

      // assert
      expect(actual).to.deep.equal(expected)
    })

    it('with != number as argument should set limit to 5', () => {
      // setup
      const argument = '10'
      const thisConfig = Object.assign({}, config)
      const limit = helperApi.limit(argument)

      // expected value
      const expected = {limit: 5}

      // actual value
      const actual = limit(thisConfig).parameters

      // assert
      expect(actual).to.deep.equal(expected)
    })
  })

  describe('function offset', () => {
    it('should throw error if limit has not been called first', () => {
      // setup
      const thisConfig = Object.assign({}, config)
      const offset = helperApi.offset(5)

      // expected value
      const expected = 'Offset can only be called after limit has been called'

      // assert
      expect(() => offset(thisConfig)).to.throw(expected)
    })

    it('should throw error if called without argument', () => {
      // setup
      const offset = helperApi.offset

      // expected value
      const expected = 'Argument is required and must be of type number'

      // assert
      expect(() => offset()).to.throw(expected)
    })

    it('should add offset to query if parameter list has limit', () => {
      // setup
      const thisConfig = Object.assign({}, config, { parameters: {limit: 5} })
      const offset = helperApi.offset(5)

      // expected value
      const expected = { limit: 5, offset: 5 }

      // actual
      const actual = offset(thisConfig).parameters

      // assert
      expect(actual).to.deep.equal(expected)
    })

    it('should throw error if called without argument even if limit has been set', () => {
      // setup
      const thisConfig = Object.assign({}, config, { parameters: {limit: 5} })
      const offset = helperApi.offset

      // expected value
      const expected = 'Argument is required and must be of type number'

      // assert
      expect(() => offset(thisConfig)).to.throw(expected)
    })
  })
})