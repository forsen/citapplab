import chai from 'chai'
import { ckanVerify } from '../src'

chai.expect()

const expect = chai.expect

describe('CKAN tests', function () {
  it('Verify host is valid', () => {
    return ckanVerify('https://data.smartbydata.no/')
      .catch(() => {
        throw new Error('not supposed to fail')
      })
  })
  it('Verify host is invalid', () => {
    return ckanVerify('https://google.no')
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((message) => {
        expect(message).to.equal('not a valid ckan host')
      })
  })
})
