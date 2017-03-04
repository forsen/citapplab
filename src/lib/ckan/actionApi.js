import { compose, DataFetcher, HTTPErrorHandler } from '../utils'
import CkanHTTPErrorHandler from './ckanHttpErrorHandler'
import { makeRequests, Parsers } from './utils'

const parsers = Parsers()
const httpErrorHandler = HTTPErrorHandler()
const ckanHttpErrorHandler = CkanHTTPErrorHandler()
const dataFetcher = DataFetcher()

const ENDPOINT = {
  package_list: 'package_list',
  current_package_list_with_resources: 'current_package_list_with_resources',
  package_search: 'package_search',
  datastore_search: 'datastore_search'
}

export default (config) => {
  const {
    resourceParser,
    packageParser
  } = parsers

  const fetchMyData = compose(dataFetcher.fetch, makeRequests)
  return {
    packages () {
      const endpoint = config.parameters.hasOwnProperty('q')
        ? ENDPOINT.package_search
        : ENDPOINT.package_list

      return fetchMyData(Object.assign({}, config, { endpoint: endpoint }))
        .then(httpErrorHandler.checkResponse)
        .then((response) => response.json())
        .then(ckanHttpErrorHandler.checkResponse)
        .then(packageParser)
    },
    datastoreSearch () {
      return fetchMyData(Object.assign({}, config, { endpoint: 'datastore_search' }))
        .then(httpErrorHandler.checkResponse)
        .then((response) => response.json())
        .then(ckanHttpErrorHandler.checkResponse)
        .then(resourceParser)
    }
  }
}
