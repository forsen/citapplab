import { expect } from 'chai'
import HelperApi from '../../../src/lib/ckan/helperApi'
import { compose } from '../../../src/lib/utils'

describe('CKAN Helper Api tests', () => {
  const helperApi = HelperApi()
  const config = {
    apiUrl: '',
    parameters: []
  }
  it('Function limit without arguments should set limit to 5', () => {
    // setup
    const thisConfig = Object.assign({}, config)
    const limit = compose(helperApi.limit)(thisConfig)

    // expected value
    const expected = { limit: 5 }

    // actual value
    const actual = limit.parameters

    // assert
    expect(actual).to.deep.equal(expected)
  })

  it('Function limit with number argument should set limit to number', () => {
    // setup
    const argument = 10
    const thisConfig = Object.assign({}, config)
    const limit = compose(helperApi.limit(argument))(thisConfig)

    // expected value
    const expected = { limit: 10 }

    // actual value
    const actual = limit.parameters

    // assert
    expect(actual).to.deep.equal(expected)
  })

  it('Function limit with != number as argument should set limit to 5', () => {
    // setup
    const argument = '10'
    const thisConfig = Object.assign({}, config)
    const limit = compose(helperApi.limit(argument))(thisConfig)

    // expected value
    const expected = { limit: 5 }

    // actual value
    const actual = limit.parameters

    // assert
    expect(actual).to.deep.equal(expected)
  })
})
