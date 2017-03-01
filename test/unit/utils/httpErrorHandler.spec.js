import { expect } from 'chai'
import HTTPErrorHandler from '../../../src/lib/utils/httpErrorHandler'

describe('HTTPErrorHandler tests', () => {
  const httpErrorHandler = HTTPErrorHandler()

  const createPromise = (response) => {
    return new Promise((resolve) => {
      resolve(response)
    })
  }

  it('Successful (200 - 299)', () => {
    const response = {
      status: 200
    }
    const promise = createPromise(response)

    return httpErrorHandler.checkResponse(promise)
      .then((response) => {
        expect(response.status).to.equal(200)
      })
  })

  it('Unsuccessful with responseText (300)', () => {
    const response = {
      status: 300,
      statusText: '300 statusText'
    }
    const promise = createPromise(response)

    return httpErrorHandler.checkResponse(promise)
      .then(() => {
        throw new Error('Not supposed to succeed')
      })
      .catch((error) => {
        expect(error.message).to.equal('300 statusText')
        expect(error.response).to.equal(response)
      })
  })

  it('Unsuccessful without responseText (404)', () => {
    const response = {
      status: 404
    }
    const promise = createPromise(response)
    return httpErrorHandler.checkResponse(promise)
      .then(() => {
        throw new Error('Not supposed to succeed')
      })
      .catch((error) => {
        expect(error.message).to.equal('404')
        expect(error.response).to.equal(response)
      })
  })
})
