import { DefaultErrorCodes } from '../utils'
import CkanError from './ckanErrorCodes'
import LibApi from './libApi'
import HelperApi from './helperApi'
import ParserApi from './parserApi'

const API_URI = '/api/3/action/'

const ErrorCodes = () => {
  const ckanError = CkanError()
  const error = DefaultErrorCodes()
  return Object.assign({}, ckanError, error)
}

const Ckan = (config) => {
  const errorCodes = ErrorCodes()

  if (config === undefined) {
    throw errorCodes.missingConfig()
  }
  if (config.baseUrl === undefined) {
    throw errorCodes.missingBaseUrl()
  }

  const baseUrl = config.baseUrl.replace(/\/$/, '')
  const apiUrl = baseUrl + API_URI

  const initialConfig = Object.assign({}, config, { apiUrl: apiUrl, parameters: {} })

  return Object.assign(
    {},
    LibApi(initialConfig),
    HelperApi(initialConfig),
    {parsers: ParserApi(initialConfig)}
  )
}

export default Ckan
