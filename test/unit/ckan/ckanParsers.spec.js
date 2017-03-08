import { expect } from 'chai'

import Parsers from '../../../src/lib/ckan/ckanParsers'

describe('Parsers', () => {
  const response = {
    success: true,
    result: {
      results: [],
      records: []
    }
  }

  const parsers = Parsers()

  it('resourceParser should return a resolved promise', () => {
    return parsers.resourceDefault(response)
      .then((jsonResponse) => {
        expect(jsonResponse).to.be.an('array')
      })
  })

  it('packageParser should return a resolved promise', () => {
    return parsers.packageDefault(response)
      .then((jsonResponse) => {
        expect(jsonResponse).to.be.an('array')
      })
  })
})
