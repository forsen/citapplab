import { compose, DataFetcher, HTTPErrorHandler } from '../utils'
import CkanHTTPErrorHandler from './ckanHttpErrorHandler'
import { makeRequests, Parsers } from './utils'

const parsers = Parsers()
const httpErrorHandler = HTTPErrorHandler()
const ckanHttpErrorHandler = CkanHTTPErrorHandler()
const dataFetcher = DataFetcher()

export default (actionApiArguments) => {
  const {
    config
  } = actionApiArguments

  const {
    resourceParser,
    packageParser
  } = parsers

  const fetchMyData = compose(dataFetcher.fetch, makeRequests)
  return {
    listAllPackages () {
      return fetchMyData(Object.assign({}, config, { endpoint: 'package_list' }))
        .then(httpErrorHandler.checkResponse)
        .then((response) => response.json())
        .then(ckanHttpErrorHandler.checkResponse)
        .then(packageParser)
    },
    listAllPackagesWithResources () {
      return fetchMyData(Object.assign({}, config, { endpoint: 'current_package_list_with_resources' }))
        .then(httpErrorHandler.checkResponse)
        .then((response) => response.json())
        .then(ckanHttpErrorHandler.checkResponse)
        .then(packageParser)
    },
    packageSearch () {
      return fetchMyData(Object.assign({}, config, { endpoint: 'package_search' }))
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
