import CkanErrorCodes from '../../../src/lib/ckan/ckanErrorCodes'
import { expect } from 'chai'

const INVALID_CKAN_URI = 'Provided baseUrl does not contain a valid ckan api'

describe('CKAN Error codes tests', () => {
  const ckanErrorCodes = CkanErrorCodes()
  it('invalidCkanUri has correct message', () => {
    expect(() => {
      throw ckanErrorCodes.invalidCkanUri()
    }).to.throw(INVALID_CKAN_URI)
  })
})
