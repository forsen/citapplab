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
                }
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

  const error = new Error('Not supposed to fail')
  const config = {
    url: '',
    options: {}
  }

  const actionApiArguments = {
    config
  }
  it('listAllPackages should return a resolved promise', () => {
    const actionApi = ActionApi(actionApiArguments)

    return actionApi.listAllPackages()
      .then((response) => {
        expect(response).to.be.a('object')
      })
      .catch(() => {
        throw error
      })
  })

  it('listAllPackagesWithResources should return a resolved promise', () => {
    const actionApi = ActionApi(actionApiArguments)

    return actionApi.listAllPackagesWithResources()
      .then((response) => {
        expect(response).to.be.a('object')
      })
      .catch(() => {
        throw error
      })
  })

  it('packageSearch with empty parameter list should return all packages', () => {
    const actionApi = ActionApi(actionApiArguments)

    return actionApi.packageSearch()
      .then((response) => {
        expect(response).to.be.a('object')
      })
      .catch(() => {
        throw error
      })
  })

  it('datastoreSearch should return a resolved promise', () => {
    const actionApi = ActionApi(actionApiArguments)

    return actionApi.datastoreSearch()
      .then((response) => {
        expect(response).to.be.a('object')
      })
      .catch(() => {
        throw error
      })
  })
})
