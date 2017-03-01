import { expect } from 'chai'
import { makeRequests, Parsers } from '../../../src/lib/ckan/utils'

describe('CKAN Utils tests', () => {
  describe('MakeRequests', () => {
    const config = {
      apiUrl: 'apiUrl'
    }
    const endpoint = 'endpoint'
    const parameters = []

    it('makeRequests should return request create url from arguments', () => {
      const request = makeRequests(config, endpoint, parameters)
      expect(request.url).to.equal('apiUrlendpoint')
    })

    it('makeRequests should provide options object', () => {
      const request = makeRequests(config, endpoint, parameters)
      expect(request.options.method).to.equal('GET')
      expect(request.options.headers).to.deep.equal({'Accept': 'application/json'})
    })
  })

  describe('Parsers', () => {
    const response = () => {
      return {
        json () {
          return new Promise((resolve) => {
            resolve({data: 'someData'})
          })
        }
      }
    }

    const promise = new Promise((resolve) => {
      resolve(response())
    })

    const parsers = Parsers()

    it('resourceParser should return a resolved promise', () => {
      return parsers.resourceParser(promise)
        .then((jsonResponse) => {
          expect(jsonResponse).to.deep.equal({data: 'someData'})
        })
    })

    it('packageParser should return a resolved promise', () => {
      return parsers.packageParser(promise)
        .then((jsonResponse) => {
          expect(jsonResponse).to.deep.equal({data: 'someData'})
        })
    })
  })
})
