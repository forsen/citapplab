import { expect } from 'chai'

import { DataFetcher } from '../../../src/lib/utils'

describe('DataFetcher tests', () => {
  let tempFetch
  before(() => {
    tempFetch = global.fetch
    global.fetch = (url, options) => {
      return Promise.resolve({url: url, options: options})
    }
  })

  after(() => {
    global.fetch = tempFetch
  })

  const dataFetcher = DataFetcher()
  it('Should return a function called with url and options', () => {
    return dataFetcher.fetch({url: 'url', options: 'someOptions'})
      .then((obj) => {
        console.log(obj)
        expect(obj.url).to.equal('url')
        expect(obj.options).to.deep.equal('someOptions')
      })
  })
})
