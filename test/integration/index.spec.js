import fetch from 'node-fetch'
import {expect} from 'chai'

import citapplab, {compose} from '../../lib/bundle'

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
      packages,
      resource,
      query
    } = Ckan({baseUrl: CKAN_HOST})

    describe('packages', () => {
      it('should list all packages', () => {
        // setup
        const getPackages = compose(execute, packages)

        // assert
        return getPackages()
          .then((result) => expect(Array.isArray(result)).to.be.true)
          .catch((error) => {
            throw error
          })
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
          .catch((error) => {
            throw error
          })
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
          .catch((error) => {
            throw error
          })
      })

      it('should return a result based on search query', () => {
        // setup
        const getPackages = compose(
          execute,
          query('barn'),
          packages
        )

        // expected value
        const expected = 3

        // assert
        return getPackages()
          .then((result) => expect(Object.keys(result).length).to.equal(expected))
          .catch((error) => {
            throw error
          })
      })
    })

    describe('resource', () => {
      it('should return a resource', () => {
        // setup
        const resourceId = 'd0860282-5301-4b11-8a7c-929d19402193'
        const getResources = compose(
          execute,
          resource(resourceId)
        )

        // expected value
        const expected = 0

        // assert
        return getResources()
          .then((result) => expect(Object.keys(result).length).to.be.greaterThan(expected))
          .catch((error) => { throw error })
      })

      it('should throw error if no arguments is passed', () => {
        // setup
        const getResources = compose(
          execute,
          resource
        )

        // expected value
        const expected = 'resource must be called with an argument as string'

        // assert
        return expect(() => {
          getResources()
        }).to.throw(expected)
      })
    })
  })
})
