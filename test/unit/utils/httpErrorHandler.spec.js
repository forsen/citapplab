import { expect } from 'chai'
import HTTPErrorHandler from '../../../src/lib/utils/httpErrorHandler'

describe('HTTPErrorHandler tests', () => {
  const httpErrorHandler = HTTPErrorHandler()

  it('Successful (200 - 299)', () => {
    const response = {
      status: 200
    }

    return httpErrorHandler.checkResponse(response)
      .then((response) => {
        expect(response.status).to.equal(200)
      })
  })

  it('Unsuccessful with responseText (300)', () => {
    const response = {
      status: 300,
      statusText: '300 statusText'
    }

    return httpErrorHandler.checkResponse(response)
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
    return httpErrorHandler.checkResponse(response)
      .then(() => {
        throw new Error('Not supposed to succeed')
      })
      .catch((error) => {
        expect(error.message).to.equal('404')
        expect(error.response).to.equal(response)
      })
  })
})
