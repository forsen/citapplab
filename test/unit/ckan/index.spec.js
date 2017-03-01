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
    const ckan = Ckan({baseUrl: 'someUrl'})
    it('listAllPackages', () => {
      expect(ckan.listAllPackages).to.be.a('function')
    })
    it('datastoreSearch', () => {
      expect(ckan.datastoreSearch).to.be.a('function')
    })
    it('listAllPackagesWithResources', () => {
      expect(ckan.listAllPackagesWithResources).to.be.a('function')
    })
    it('packageSearch', () => {
      expect(ckan.packageSearch).to.be.a('function')
    })
  })
})
