import chai from 'chai'
import citapplab from '../../src'

const ckan = citapplab.ckan
const expect = chai.expect

const CKAN_HOST = 'https://data.smartbydata.no'
// const CKAN_HOST = 'http://demo.ckan.org'
const NOT_CKAN_HOST = 'https://google.com'

describe('CKAN Module tests', () => {
  it('Verify host is valid', () => {
    return ckan.verify(CKAN_HOST)
      .catch(() => {
        throw new Error('not supposed to fail')
      })
  })

  it('Verify host is invalid', () => {
    return ckan.verify(NOT_CKAN_HOST)
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((error) => {
        expect(error.message).to.equal('not a valid ckan host')
      })
  })
})
