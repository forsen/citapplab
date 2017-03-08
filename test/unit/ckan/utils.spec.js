import { expect } from 'chai'
import { makeRequests } from '../../../src/lib/ckan/utils'

describe('CKAN Utils tests', () => {
  describe('MakeRequests', () => {
    const config = {
      apiUrl: 'apiUrl',
      endpoint: 'endpoint',
      parameters: {
        parameter1: 'value',
        parameter2: 'otherValue'
      }
    }

    it('makeRequests should return request create url from arguments', () => {
      const request = makeRequests(config)
      expect(request.url).to.equal('apiUrlendpoint?parameter1=value&parameter2=otherValue')
    })

    it('makeRequests should return request create url without parameters', () => {
      const request = makeRequests(Object.assign({}, config, {parameters: []}))
      expect(request.url).to.equal('apiUrlendpoint')
    })

    it('makeRequests should provide options object', () => {
      const request = makeRequests(config)
      expect(request.options.method).to.equal('GET')
      expect(request.options.headers).to.deep.equal({'Accept': 'application/json'})
    })
  })
})
