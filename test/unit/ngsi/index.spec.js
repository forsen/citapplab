import Ngsi from '../../../src/lib/ngsi'

const NGSI_HOST = 'http://unagi.no:1026/'

const error = new Error('not supposed to fail')

describe('NGSI Module tests', () => {
  it('bla bla ', () => {
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

    let test = Ngsi()
    return test.query(fetch, NGSI_HOST)
      .catch(() => {
        throw error
      })
  })
})
