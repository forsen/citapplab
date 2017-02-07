import chai from 'chai'
import { verify } from '../lib/bundle'

chai.expect()

const expect = chai.expect

describe('Initial tests', function () {
  it('fetch API (or polyfill) should be available', () => {
    expect(verify()).to.be.true
  })
})
