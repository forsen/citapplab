import { expect } from 'chai'
import Ckan from '../../../src/lib/ckan'

const errorCodes = {
  missingBaseUrl: 'The baseUrl is missing',
  missingConfig: 'A configuration is needed',
  invalidCkanUri: 'Provided baseUrl does not contain a valid ckan api'
}

describe('CKAN Module tests', () => {
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
})
