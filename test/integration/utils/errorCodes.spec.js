import fetch from 'node-fetch'
import { expect } from 'chai'
import { DataFetcher, HTTPErrorHandler } from '../../../src/lib/utils'

describe('Testing http codes', () => {
  const dataFetcher = DataFetcher(fetch)
  const httpErrorHandler = HTTPErrorHandler()

  it('200', () => {
    return dataFetcher.fetch({url: 'http://httpstat.us/200'})
      .then(httpErrorHandler.checkResponse)
      .then((response) => {
        expect(response.status).to.equal(200)
      })
      .catch(() => {
        throw new Error('not supposed to fail')
      })
  })
  it('500', () => {
    return dataFetcher.fetch({url: 'http://httpstat.us/500'})
      .then(httpErrorHandler.checkResponse)
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((error) => {
        expect(error.message).to.equal('Internal Server Error')
        expect(error.response).to.be.a('object')
      })
  })
})
