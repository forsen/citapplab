import createFetch from 'fetch-ponyfill'
import { DataFetcher } from '../utils'
import {
  MissingBaseUrl
} from './customError'

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

const action = (dataFetcher, config, makeRequests) => {
  return {
    listAllPackages () {
      const request = makeRequests(config.apiUrl, 'package_list')
      return dataFetcher.fetch(request.url, request.options)
    }
  }
}

const Ckan = (baseUrl) => {
  const missingBaseUrl = MissingBaseUrl()
  const fetch = createFetch().fetch
  // TODO: check for trailing slash
  const apiUrl = baseUrl + '/api/3/action/'

  if (baseUrl === undefined) {
    return () => {
      throw missingBaseUrl.error()
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
    action(dataFetcher, config, makeRequests))
}

export default Ckan
