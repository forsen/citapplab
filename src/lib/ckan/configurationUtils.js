import {ENDPOINT} from './actionApi'
import compose from '../utils/compose'
const checkParameterList = (config) => {
  return fixParameterList(config)
}

const fixParameterList = (config) => {
  switch (config.endpoint) {
    case ENDPOINT.package_search:
      return convertParameterListToPackages(config)
    case ENDPOINT.datastore_search:
      return convertParameterListToResources(config)
    default:
      return { ...config, error: 'unsupported endpoint' }
  }
}
const convertParameterListToPackages = (config) => {
  return {
    ...config,
    parameters: Object.keys(config.parameters).reduce((result, key) => {
      if (key === 'limit') {
        result['rows'] = config.parameters['limit']
      } else if (key === 'offset') {
        result['start'] = config.parameters['offset']
      } else {
        result[key] = config.parameters[key]
      }
      return result
    }, {})
  }
}

const convertParameterListToResources = (config) => {
  return {
    ...config,
    parameters: Object.keys(config.parameters).reduce((result, key) => {
      if (key === 'rows') {
        result['limit'] = config.parameters['rows']
      } else if (key === 'start') {
        result['offset'] = config.parameters['start']
      } else {
        result[key] = config.parameters[key]
      }
      return result
    }, {})
  }
}

const checkConfig = (config) => {
  return config
}

export default () => {
  return {
    checkConfiguration (config) {
      const verifyConfig = compose(checkConfig, checkParameterList)
      return verifyConfig(config)
    }
  }
}
