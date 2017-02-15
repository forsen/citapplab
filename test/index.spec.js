
import chai from 'chai'
import citapplab from '../src'

const expect = chai.expect
const HOST = 'http://demo.ckan.com'

describe('Index tests', () => {
  it('Test fetch interception', () => {
    const unregister = citapplab.register()
    return fetch(HOST)
      .then((response) => {
        unregister()
        expect(response.url).to.equal('http://demo.ckan.com/api/3')
      })
      .catch((error) => {
        console.log(error)
        throw new Error('not supposed to fail')
      })
  })
  it('Test fetch interception is unregistered', () => {
    return fetch(HOST)
      .then((response) => {
        expect(response.url).to.equal(HOST)
      })
  })
})
