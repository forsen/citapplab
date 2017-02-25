import { expect } from 'chai'
import Ckan from '../../src/lib/ckan'

const CKAN_HOST = 'https://data.smartbydata.no/'

const errorCodes = {
  missingBaseUrl: 'The baseUrl is missing',
  invalidCkanUri: 'Provided baseUrl does not contain a valid ckan api'
}

// const NOT_CKAN_HOST = 'anything else'

describe('CKAN Module tests', () => {
/*
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
  */
  it('test', () => {
    const myobj = Ckan(CKAN_HOST)
    return myobj.listAllPackages()
      .then((result) => {
        expect(result.status).to.equal(200)
        return result.json()
      })
      .then((response) => {
        expect(response.success).to.be.true
      })
      .catch(() => {
        throw new Error('Not supposed to fail')
      })
  })

  it('Instantiation without baseUrl should throw error', () => {
    expect(Ckan()).to.throw(errorCodes.missingBaseUrl)
  })
  /*
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
  */
})
