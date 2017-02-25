import { expect } from 'chai'
import Ckan from '../../src/lib/ckan'

const CKAN_HOST = 'https://data.smartbydata.no/'

const errorCodes = {
  missingBaseUrl: 'The baseUrl is missing',
  invalidCkanUri: 'Provided baseUrl does not contain a valid ckan api'
}

// const NOT_CKAN_HOST = 'anything else'

describe('CKAN Module tests', () => {
  it('test', () => {
    const myobj = Ckan(CKAN_HOST)
    return myobj.listAllPackages()
      .then((result) => {
        expect(result.status).to.equal(200)
        return result.json()
      })
      .then((response) => {
        expect(response.success).to.be.true
      })
      .catch(() => {
        throw new Error('Not supposed to fail')
      })
  })

  it('Instantiation without baseUrl should throw error', () => {
    expect(Ckan()).to.throw(errorCodes.missingBaseUrl)
  })
})
