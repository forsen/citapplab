import fetch from 'node-fetch'
import { expect } from 'chai'

// import { Ngsi, Ckan } from '../../lib/bundle'
import citapplab, { compose } from '../../lib/bundle'

const {
  Ckan,
  Ngsi
} = citapplab
const CKAN_HOST = 'https://data.smartbydata.no/'
const error = new Error('not supposed to fail')

global.fetch = fetch

describe('Library', () => {
  it('should export NGSI', () => {
    expect(Ngsi).to.exist
  })
  it('should export CKAN', () => {
    expect(Ckan).to.exist
  })

  describe('CKAN library functions', () => {
    const {
      execute,
      packages
    } = Ckan({baseUrl: CKAN_HOST})
    it('List all packages', () => {
      const getPackages = compose(execute, packages)
      return getPackages()
        .then((jsonResult) => {
          expect(jsonResult.success).to.be.true
        })
        .catch(() => {
          throw error
        })
    })
  })
})
