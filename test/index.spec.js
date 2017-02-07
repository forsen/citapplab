import chai from 'chai'
import { welcome } from '../src'

chai.expect()

const expect = chai.expect

describe('Hello world', function () {
  it('welcome should be "hello world"', () => {
    expect(welcome()).to.be.equal('node')
  })
})
