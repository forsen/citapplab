import chai from 'chai'
import { verify } from '../src'

chai.expect()

const expect = chai.expect

describe('Initial tests', function () {
  it('fetch should return status 200', () => {
    return verify().then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
