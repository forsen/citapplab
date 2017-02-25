import { expect } from 'chai'

import { Query } from '../../../src/lib/ngsi/actions'

describe('NGSI Actions', () => {
  it('Query action', () => {
    const fetch = () => {
      return new Promise((resolve) => {
        resolve({
          json: () => {
            return new Promise((resolve) => {
              resolve({
                some: 'data'
              })
            })
          }
        })
      })
    }
    const obj = Query()
    return obj.query(fetch, 'http://balle.no', null)
      .then((obj) => {
        expect(obj.some).to.equal('data')
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  })
})
