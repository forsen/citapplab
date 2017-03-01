import ActionApi from '../../../src/lib/ckan/actionApi'

import { expect } from 'chai'
describe('CKAN ActionApi', () => {
  const error = new Error('Not supposed to fail')
  const config = {
    url: '',
    options: {}
  }
  const dataFetcher = (() => {
    return {
      fetch () {
        return new Promise((resolve) => {
          resolve({
            status: 200,
            json: () => {
              return new Promise((resolve) => {
                resolve({
                  some: 'data'
                })
              })
            }
          })
        })
      }
    }
  })()

  const parsers = (() => {
    return {
      packageParser () {
        return new Promise((resolve) => {
          resolve({})
        })
      },
      datastoreParser () {
        return new Promise((resolve) => {
          resolve({})
        })
      }
    }
  })()

  const makeRequests = () => {
    return ''
  }

  it('listAllPackages should return a resolved promise', () => {
    const actionApi = ActionApi(dataFetcher, config, makeRequests, parsers)

    return actionApi.listAllPackages()
      .then((response) => {
        expect(response).to.be.a('object')
      })
      .catch(() => {
        throw error
      })
  })

  it('listAllPackagesWithResources should return a resolved promise', () => {
    const actionApi = ActionApi(dataFetcher, config, makeRequests, parsers)

    return actionApi.listAllPackagesWithResources()
      .then((response) => {
        expect(response.status).to.equal(200)
      })
      .catch(() => {
        throw error
      })
  })

  it('searchPackages with empty parameter list should return all packages', () => {
    const actionApi = ActionApi(dataFetcher, config, makeRequests, parsers)

    return actionApi.searchPackages()
      .then((response) => {
        expect(response).to.be.a('object')
      })
      .catch(() => {
        throw error
      })
  })

  it('datastoreSearch should return a resolved promise', () => {
    const actionApi = ActionApi(dataFetcher, config, makeRequests, parsers)

    return actionApi.datastoreSearch()
      .then((response) => {
        expect(response).to.be.a('object')
      })
      .catch(() => {
        throw error
      })
  })
})
