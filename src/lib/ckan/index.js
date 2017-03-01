import { DefaultErrorCodes } from '../utils'
import CkanError from './ckanErrorCodes'
import ActionApi from './actionApi'

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

  const _config = Object.assign({}, config, { apiUrl: apiUrl })

  const actionApiArguments = {
    config: _config
  }
  return Object.assign(
    {},
    ActionApi(actionApiArguments))
}

export default Ckan
