import chai from 'chai'
import citapplab from '../src'

const expect = chai.expect
const CKAN_HOST = 'http://demo.ckan.org'
const NOT_CKAN_HOST = 'https://google.com'

describe('CKAN tests', () => {
  it('Verify host is valid', () => {
    return citapplab.ckanVerify(CKAN_HOST)
      .catch(() => {
        throw new Error('not supposed to fail')
      })
  })

  it('Verify host is invalid', () => {
    return citapplab.ckanVerify(NOT_CKAN_HOST)
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((message) => {
        expect(message).to.equal('not a valid ckan host')
      })
  })

  it('Get group list from ckan api', () => {
    return citapplab.action(CKAN_HOST, citapplab.actionTypes.GROUP_LIST)
      .then((response) => response.json())
      .then((json) => {
        expect(json.success).to.true
      })
  })

  it('Fail on unsupported action type', () => {
    return citapplab.action(CKAN_HOST, 'invalid actiontype')
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((message) => {
        expect(message).to.equal('not a valid actiontype')
      })
  })

  it('Fail on missing action type', () => {
    return citapplab.action(CKAN_HOST)
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((message) => {
        expect(message).to.equal('missing required actiontype')
      })
  })
})
