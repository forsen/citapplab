import { expect } from 'chai'
import { Verifier } from '../../src/lib/ckan/get'

const CKAN_HOST = 'anything'
const NOT_CKAN_HOST = 'anything else'

describe('CKAN Module tests', () => {
  let fetch
  let obj
  before(() => {
    fetch = (url) => {
      return new Promise((resolve, reject) => {
        console.log(url)
        if (url === CKAN_HOST + '/api/3') {
          resolve({
            status: 200,
            json: () => {
              return new Promise((resolve) => {
                resolve({
                  some: 'data'
                })
              })
            }
          })
        } else {
          reject(new Error('not a valid ckan host'))
        }
      })
    }
    obj = Verifier()
  })
  it('Verify host is valid', () => {
    return obj.verify(fetch, CKAN_HOST)
      .catch(() => {
        throw new Error('not supposed to fail')
      })
  })

  it('Verify host is invalid', () => {
    return obj.verify(fetch, NOT_CKAN_HOST)
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((error) => {
        expect(error.message).to.equal('not a valid ckan host')
      })
  })
})
