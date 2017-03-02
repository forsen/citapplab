import fetch from 'node-fetch'
import { expect } from 'chai'

import citapplab, { compose } from '../../lib/bundle'

const {
  Ckan,
  Ngsi
} = citapplab
const CKAN_HOST = 'https://data.smartbydata.no/'

global.fetch = fetch

describe('Library', () => {
  it('should export NGSI', () => {
    // assert
    expect(Ngsi).to.exist
  })
  it('should export CKAN', () => {
    // assert
    expect(Ckan).to.exist
  })

  describe('CKAN', () => {
    const {
      execute,
      limit,
      packages
    } = Ckan({baseUrl: CKAN_HOST})

    it('should list all packages', () => {
      // setup
      const getPackages = compose(execute, packages)

      // assert
      return getPackages()
        .then((result) => expect(Array.isArray(result)).to.be.true)
        .catch((error) => { throw error })
    })

    it('should list first 10 packages', () => {
      // setup
      const getPackages = compose(
        execute,
        limit(10),
        packages
      )

      // expected value
      const expected = 10

      // assert
      return getPackages()
        .then((jsonResult) => expect(Object.keys(jsonResult).length).to.equal(expected))
        .catch((error) => { throw error })
    })

    it('should list default limit (5) packages', () => {
      // setup
      const getPackages = compose(
        execute,
        limit,
        packages
      )

      // expected value
      const expected = 5

      // assert
      return getPackages()
        .then((result) => expect(Object.keys(result).length).to.equal(expected))
        .catch((error) => { throw error })
    })
  })
})
