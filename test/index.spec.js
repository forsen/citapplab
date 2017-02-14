import chai from 'chai'
import { ckanResolveUrl, hostIsCkan, verify } from '../src'

chai.expect()

const expect = chai.expect

describe('CKAN tests', function () {
  it('fetch should return status 200', () => {
    return verify('https://data.smartbydata.no').then((response) => {
      expect(response.status).to.equal(200)
    })
  })
  it('getURL should resolve correct url', () => {
    const host = 'https://data.smartbydata.no'
    const expected = 'https://data.smartbydata.no/api/action/datastore_search'
    expect(ckanResolveUrl(host)).to.equal(expected)
  })
  it('Verify host is valid', () => {
    return hostIsCkan('https://data.smartbydata.no')
  })
  it('Verify host is invalid', () => {
    return hostIsCkan('https://google.no')
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((m) => {
        expect(m).to.equal('not a valid ckan host')
      })
  })
})
