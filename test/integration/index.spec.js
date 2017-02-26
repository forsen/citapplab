import { Ngsi, Ckan } from '../../lib/bundle'
import { expect } from 'chai'

const CKAN_HOST = 'https://data.smartbydata.no/'
const error = new Error('not supposed to fail')

describe('Library', () => {
  it('should export NGSI', () => {
    expect(Ngsi).to.exist
  })
  it('should export CKAN', () => {
    expect(Ckan).to.exist
  })

  describe('CKAN library functions', () => {
    const ckan = Ckan(CKAN_HOST)
    it('test anything', () => {
      return ckan.listAllPackages()
        .then((response) => response.json())
        .then((jsonResult) => {
          expect(jsonResult.success).to.be.true
        })
        .catch((err) => {
          console.log(err)
          throw error
        })
    })
  })
})
