import { expect } from 'chai'

import { DataFetcher } from '../../../src/lib/utils'

describe('DataFetcher tests', () => {
  const myFetch = (url, options) => {
    return Promise.resolve({url: url, options: options})
  }
  const dataFetcher = DataFetcher(myFetch)
  it('Should return a function called with url and options', () => {
    return dataFetcher.fetch('url', {data: 'someOptions'})
      .then((obj) => {
        expect(obj.url).to.equal('url')
        expect(obj.options).to.deep.equal({data: 'someOptions'})
      })
  })
})
