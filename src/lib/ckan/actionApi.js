import { compose, DataFetcher, HTTPErrorHandler } from '../utils'
import CkanHTTPErrorHandler from './ckanHttpErrorHandler'
import { makeRequests } from './utils'
import Parsers, { constants as parserConstants } from './ckanParsers'

const httpErrorHandler = HTTPErrorHandler()
const ckanHttpErrorHandler = CkanHTTPErrorHandler()
const dataFetcher = DataFetcher()

const {
  packageDefault,
  packageGetResources,
  raw,
  resourceDefault
} = Parsers()

const ENDPOINT = {
  package_list: 'package_list',
  current_package_list_with_resources: 'current_package_list_with_resources',
  package_search: 'package_search',
  datastore_search: 'datastore_search'
}

const fetchMyData = compose(dataFetcher.fetch, makeRequests)

const execute = (config) => {
  let parser
  switch (config.parser) {
    case parserConstants.PACKAGE_DEFAULT:
      parser = packageDefault
      console.log('default package')
      break
    case parserConstants.PACKAGE_GET_RESOURCES:
      parser = packageGetResources
      console.log('get resource parces')
      break
    case parserConstants.RAW:
      parser = raw
      console.log('rawshit')
      break
    case parserConstants.RESOURCE_DEFAULT:
      parser = resourceDefault
      console.log('default resource')
      break
    default:
      throw new Error('no parser was found')
  }
  return fetchMyData(config)
    .then(httpErrorHandler.checkResponse)
    .then((response) => response.json())
    .then(ckanHttpErrorHandler.checkResponse)
    .then(parser)
}

export default () => {
  return {
    packages (config) {
      const thisConfig = Object.assign(
        {},
        config,
        { parser: config.parser || parserConstants.PACKAGE_DEFAULT },
        { endpoint: ENDPOINT.package_search }
      )
      return execute(thisConfig)
    },
    resource (config) {
      const thisConfig = Object.assign(
        {},
        config,
        { parser: config.parser || parserConstants.RESOURCE_DEFAULT },
        { endpoint: ENDPOINT.datastore_search }
      )
      return execute(thisConfig)
    }
  }
}
