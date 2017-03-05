import { expect } from 'chai'

import LibApi from '../../../src/lib/ckan/libApi'

describe('CKAN LibApi', () => {
  const config = {
    parameters: {}
  }

  const {
    packages,
    resource
  } = LibApi(config)

  describe('packages', () => {
    it('should return an object with execute packages attribute', () => {
      // setup
      const thisPackage = packages()

      // expected value
      const expected = 'packages'

      // actual value
      const actual = thisPackage.execute

      // assert
      expect(actual).to.equal(expected)
    })
  })
  describe('resource', () => {
    it('should return an object with execute resource attribute if called correctly', () => {
      // setup
      const thisResource = resource({})

      // expected value
      const expected = 'resource'

      // actual value
      const actual = thisResource.execute

      // assert
      expect(actual).to.equal(expected)
    })

    it('should return a function if called with string as argument', () => {
      // setup
      const thisResource = resource('myId')()

      // expected value
      const expected = 'resource'

      // actual value
      const actual = thisResource.execute

      // assert
      expect(actual).to.equal(expected)
    })

    it('should throw an error if called without id', () => {
      // expected value
      const expected = 'resource must be called with an argument as string'

      // assert
      expect(() => resource()).to.throw(expected)
    })
  })
})
