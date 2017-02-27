import { DataFetcher, DefaultErrorCodes } from '../utils'
import CkanError from './ckanErrorCodes'
import ActionApi from './actionApi'
import { makeRequests } from './utils'

const API_URI = 'api/3/action/'

const ErrorCodes = () => {
  const ckanError = CkanError()
  const error = DefaultErrorCodes()
  return Object.assign({}, ckanError, error)
}

const Ckan = (baseUrl) => {
  const errorCodes = ErrorCodes()

  // TODO: check for trailing slash
  const apiUrl = baseUrl + API_URI

  if (baseUrl === undefined) {
    // return () => {
    throw errorCodes.missingBaseUrl()
    // }
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
