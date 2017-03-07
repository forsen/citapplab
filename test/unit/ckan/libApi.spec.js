import { expect } from 'chai'

import LibApi from '../../../src/lib/ckan/libApi'

describe('CKAN LibApi', () => {
  const config = {
    parameters: {}
  }

  const {
    resource
  } = LibApi(config)

  describe('resource', () => {
    it('should throw an error if called without id', () => {
      // expected value
      const expected = 'resource must be called with an argument as string'

      // assert
      expect(() => resource()).to.throw(expected)
    })
  })
})
