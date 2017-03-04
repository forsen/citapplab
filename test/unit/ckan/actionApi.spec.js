import ActionApi from '../../../src/lib/ckan/actionApi'

import {expect} from 'chai'
describe('CKAN ActionApi', () => {
  let tempFetch
  before(() => {
    tempFetch = global.fetch
    global.fetch = (url) => {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          json: () => {
            return new Promise((resolve) => {
              resolve({
                success: true,
                message: 'balle',
                error: {
                  message: 'hæ'
                },
                result: [
                  url
                ]
              })
            })
          }
        })
      })
    }
  })

  after(() => {
    global.fetch = tempFetch
  })

  const config = {
    apiUrl: '',
    endpoint: '',
    parameters: {}
  }

  describe('packages', () => {
    it('should return a resolved promise', () => {
      const actionApi = ActionApi(config)

      return actionApi.packages()
        .then((response) => {
          expect(response).to.be.a('array')
        })
        .catch((error) => {
          throw error
        })
    })

    it('should use search endpoint if parameter q is in parameter list', () => {
      // setup
      const thisConfig = Object.assign({}, config, { parameters: { q: 'something' } })
      const actionApi = ActionApi(thisConfig)

      // expected value
      const expected = 'package_search?q=something'

      // assert
      return actionApi.packages()
        .then((response) => expect(response[0]).to.equal(expected))
        .catch((error) => { throw error })
    })

    it('should use list endpoint if parameter q is not in parameter list', () => {
      // setup
      const thisConfig = Object.assign({}, config)
      const actionApi = ActionApi(thisConfig)

      // expected value
      const expected = 'package_list'

      // assert
      return actionApi.packages()
        .then((response) => expect(response[0]).to.equal(expected))
        .catch((error) => { throw error })
    })
  })

  describe('resources', () => {
    it('datastoreSearch should return a resolved promise', () => {
      const actionApi = ActionApi(config)

      return actionApi.datastoreSearch()
        .then((response) => {
          expect(response).to.be.a('array')
        })
        .catch((error) => {
          throw error
        })
    })
  })
})
