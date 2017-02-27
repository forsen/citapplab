import ActionApi from '../../../src/lib/ckan/actionApi'
import { expect } from 'chai'
import { makeRequests } from '../../../src/lib/ckan/utils'
import { DataFetcher } from '../../../src/lib/utils'
describe('CKAN ActionApi', () => {
  const error = new Error('Not supposed to fail')
  const config = {
    url: '',
    options: {}
  }

  const fetch = () => {
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
  const dataFetcher = DataFetcher(fetch)

  it('listAllPackages should return a resolved promise', () => {
    const actionApi = ActionApi(dataFetcher, config, makeRequests)

    return actionApi.listAllPackages()
      .then((response) => {
        expect(response.status).to.equal(200)
      })
      .catch(() => {
        throw error
      })
  })

  it('listAllPackagesWithResources', () => {
    const actionApi = ActionApi(dataFetcher, config, makeRequests)

    return actionApi.listAllPackagesWithResources()
      .then((response) => {
        expect(response.status).to.equal(200)
      })
      .catch(() => {
        throw error
      })
  })

  it('searchPackages with empty parameter list should return all packages', () => {
    const actionApi = ActionApi(dataFetcher, config, makeRequests)

    return actionApi.searchPackages()
      .then((response) => {
        expect(response.status).to.equal(200)
      })
      .catch(() => {
        throw error
      })
  })
})
