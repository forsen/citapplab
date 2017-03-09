import { expect } from 'chai'

import LibApi from '../../../src/lib/ckan/libApi'

describe('CKAN LibApi', () => {
  const config = {
    parameters: {},
    baseUrl: 'https://data.smartbydata.no',
    apiUrl: 'https://data.smartbydata.no/api/3/action/'
  }

  const {
    resource
  } = LibApi(config)

  describe('resource', () => {
    it('should throw an error if called without id', () => {
      // expected value
      const expected = {}

      // assert
      expect(resource()).to.deep.equal(expected)
    })
  })
})
