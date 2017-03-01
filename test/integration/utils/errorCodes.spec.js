import fetch from 'node-fetch'
import { expect } from 'chai'
import { DataFetcher, HTTPErrorHandler } from '../../../src/lib/utils'

describe('Testing http codes', () => {
  const dataFetcher = DataFetcher(fetch)
  const httpErrorHandler = HTTPErrorHandler()

  it('200', () => {
    return httpErrorHandler.checkResponse(dataFetcher.fetch('http://httpstat.us/200'))
      .then((response) => {
        expect(response.status).to.equal(200)
      })
      .catch(() => {
        throw new Error('not supposed to fail')
      })
  })
  it('500', () => {
    return httpErrorHandler.checkResponse(dataFetcher.fetch('http://httpstat.us/500'))
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((error) => {
        expect(error.message).to.equal('Internal Server Error')
        expect(error.response).to.be.a('object')
      })
  })
})
