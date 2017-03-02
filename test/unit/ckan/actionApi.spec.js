import ActionApi from '../../../src/lib/ckan/actionApi'

import { expect } from 'chai'
describe('CKAN ActionApi', () => {
  let tempFetch
  before(() => {
    tempFetch = global.fetch
    global.fetch = () => {
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
                result: []
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
    parameters: []
  }

  it('listAllPackages should return a resolved promise', () => {
    const actionApi = ActionApi(config)

    return actionApi.listAllPackages()
      .then((response) => { expect(response).to.be.a('array') })
      .catch((error) => { throw error })
  })

  it('listAllPackagesWithResources should return a resolved promise', () => {
    const actionApi = ActionApi(config)

    return actionApi.listAllPackagesWithResources()
      .then((response) => {
        expect(response).to.be.a('array')
      })
      .catch((error) => { throw error })
  })

  it('packageSearch with empty parameter list should return all packages', () => {
    const actionApi = ActionApi(config)

    return actionApi.packageSearch()
      .then((response) => {
        expect(response).to.be.a('array')
      })
      .catch((error) => { throw error })
  })

  it('datastoreSearch should return a resolved promise', () => {
    const actionApi = ActionApi(config)

    return actionApi.datastoreSearch()
      .then((response) => { expect(response).to.be.a('array') })
      .catch((error) => { throw error })
  })
})
