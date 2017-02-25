import createFetch from 'fetch-ponyfill'
import { DataFetcher, DefaultErrorCodes } from '../utils'
import CkanError from './ckanErrorCodes'
import ActionApi from './actionApi'

const ErrorCodes = () => {
  const ckanError = CkanError()
  const error = DefaultErrorCodes()
  return Object.assign({}, ckanError, error)
}

const makeRequests = (apiUrl, endpoint, parameters) => {
  const _parameters = parameters || ''
  let request = {}
  request.url = apiUrl + endpoint + _parameters
  request.options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request
}

const Ckan = (baseUrl) => {
  const errorCodes = ErrorCodes()
  const fetch = createFetch().fetch
  // TODO: check for trailing slash
  const apiUrl = baseUrl + '/api/3/action/'

  if (baseUrl === undefined) {
    return () => {
      throw errorCodes.missingBaseUrl()
    }
  }

  const dataFetcher = DataFetcher(fetch)
  const config = {
    apiUrl,
    auth: '',
    options: {}
  }

  return Object.assign(
    {},
    ActionApi(dataFetcher, config, makeRequests))
}

export default Ckan
