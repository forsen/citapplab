import chai from 'chai'
import Citapplab from '../src'

chai.expect()

const expect = chai.expect

let lib

before(function () {
  lib = new Citapplab()
})

describe('Hello world', function () {
  it('welcome should be "hello world"', () => {
    expect(lib.welcome).to.be.equal('Hello World')
  })
})
