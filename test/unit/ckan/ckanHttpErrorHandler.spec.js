import { expect } from 'chai'

import CkanHTTPErrorHandler from '../../../src/lib/ckan/ckanHttpErrorHandler'

describe('CKAN HTTPErrorHandler tests', () => {
  const ckanHttpErrorHandler = CkanHTTPErrorHandler()

  it('Successful', () => {
    const response = {
      'help': 'oeu',
      'success': true,
      'result': []
    }

    return ckanHttpErrorHandler.checkResponse(response)
      .then((response) => {
        expect(response.success).to.be.true
      })
      .catch(() => {
        throw new Error('not supposed to fail')
      })
  })

  it('Unsuccessful', () => {
    const response = {
      'help': 'oeua',
      'success': false,
      'error': {
        'message': 'Some error message',
        '__type': 'Some message type'
      }
    }

    return ckanHttpErrorHandler.checkResponse(response)
      .then(() => {
        throw new Error('not supposed to succeed')
      })
      .catch((error) => {
        expect(error.message).to.equal('Some error message')
        expect(error.type).to.equal('Some message type')
        expect(error.response).to.deep.equal(response)
      })
  })
})
