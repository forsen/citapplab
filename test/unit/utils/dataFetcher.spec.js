import { expect } from 'chai'

import { DataFetcher } from '../../../src/lib/utils'

describe('DataFetcher tests', () => {
  const myFetch = (url, options) => {
    return {url: url, options: options}
  }
  const dataFetcher = DataFetcher(myFetch)
  it('Should return a function called with url and options', () => {
    const myFetch = dataFetcher.fetch('url', {data: 'someOptions'})
    expect(myFetch.url).to.equal('url')
    expect(myFetch.options).to.deep.equal({data: 'someOptions'})
  })
})
