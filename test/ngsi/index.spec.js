// import chai from 'chai'
import citapplab from '../../src'

const ngsi = citapplab.ngsi
// const expect = chai.expect

const NGSI_HOST = 'http://unagi.no:1026/'

describe('NGSI Module tests', () => {
  it('bla bla ', () => {
    let test = ngsi(NGSI_HOST, null)
    return test.query()
      .catch(() => {
        throw new Error('not supposed to fail')
      })
  })
})
