import { expect } from 'chai'
import fetch from 'node-fetch'

import Ckan from '../../../src/lib/ckan'

const errorCodes = {
  missingBaseUrl: 'The baseUrl is missing',
  missingConfig: 'A configuration is needed',
  invalidCkanUri: 'Provided baseUrl does not contain a valid ckan api'
}

describe('CKAN Module tests', () => {
  global.fetch = fetch
  it('Instantiation without baseUrl should throw error', () => {
    expect(() => {
      Ckan({})
    }).to.throw(errorCodes.missingBaseUrl)
  })

  it('Instantiation without config should throw error', () => {
    expect(() => {
      Ckan()
    }).to.throw(errorCodes.missingConfig)
  })
  describe('CKAN should expose the following functions', () => {
    const {
      flatten,
      limit,
      packages,
      resource
    } = Ckan({baseUrl: ''})
    it('flatten', () => expect(flatten).to.be.a('function'))
    it('limit', () => expect(limit).to.be.a('function'))
    it('packages', () => expect(packages).to.be.a('function'))
    it('resource', () => expect(resource).to.be.a('function'))
  })
})
