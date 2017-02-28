/* @flow */
import { DataFetcher, DefaultErrorCodes } from '../utils'
import CkanError from './ckanErrorCodes'
import ActionApi from './actionApi'
import { makeRequests } from './utils'

type CkanConfig = {| baseUrl: string, options?: Array<string> |}
const API_URI = 'api/3/action/'

const ErrorCodes = () => {
  const ckanError = CkanError()
  const error = DefaultErrorCodes()
  return Object.assign({}, ckanError, error)
}

const Ckan = (config: CkanConfig) => {
  const errorCodes = ErrorCodes()

  if (config === undefined) {
    throw errorCodes.missingConfig()
  }
  if (config.baseUrl === undefined) {
    throw errorCodes.missingBaseUrl()
  }

  const baseUrl = config.baseUrl.replace(/\/$/, '')
  const apiUrl = baseUrl + API_URI
  const dataFetcher = DataFetcher(fetch)
  const _config = Object.assign({}, config, {apiUrl: apiUrl})

  return Object.assign(
    {},
    ActionApi(dataFetcher, _config, makeRequests))
}

export default Ckan
