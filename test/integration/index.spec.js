import { ngsi, ckan } from '../../lib/bundle'
import { expect } from 'chai'

describe('Library', () => {
  it('should export NGSI', () => {
    expect(ngsi).to.not.exist
  })
  it('should export CKAN', () => {
    expect(ckan).to.exist
  })
})
