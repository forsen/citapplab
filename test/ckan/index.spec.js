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
      .catch((message) => {
        expect(message).to.equal('not a valid ckan host')
      })
  })

  it('Get group list from ckan api', () => {
    return ckan.action(CKAN_HOST, ckan.actionTypes.GROUP_LIST)
      .then((response) => response.json())
      .then((json) => {
        expect(json.success).to.true
      })
  })

  it('Fail on unsupported action type', () => {
    return ckan.action(CKAN_HOST, 'invalid actiontype')
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((message) => {
        expect(message).to.equal('not a valid actiontype')
      })
  })

  it('Fail on missing action type', () => {
    return ckan.action(CKAN_HOST)
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((message) => {
        expect(message).to.equal('missing required actiontype')
      })
  })
  it('Test package list', () => {
    return ckan.action(CKAN_HOST, ckan.actionTypes.PACKAGE_LIST)
      .then((response) => response.json())
      .then((json) => {
        expect(json.success).to.true
      })
  })
  it('Test current package list', () => {
    return ckan.action(CKAN_HOST, ckan.actionTypes.CURRENT_PACKAGE_LIST_WITH_RESOURCES)
      .then((response) => response.json())
      .then((json) => {
        expect(json.success).to.true
      })
  })
})
