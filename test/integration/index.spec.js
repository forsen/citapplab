import { Ngsi, Ckan } from '../../lib/bundle'
import { expect } from 'chai'

const CKAN_HOST = 'https://data.smartbydata.no/'

describe('Library', () => {
  it('should export NGSI', () => {
    expect(Ngsi).to.exist
  })
  it('should export CKAN', () => {
    expect(Ckan).to.exist
  })

  describe('CKAN library functions', () => {
    const ckan = Ckan(CKAN_HOST)
    ckan.listAllPackages()
  })
})
