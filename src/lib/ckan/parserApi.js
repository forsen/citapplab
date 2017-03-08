import { constants as parsers } from './ckanParsers'
export default (initialConfig) => {
  return {
    packageGetResources (config = initialConfig) {
      if (config.hasOwnProperty('parser')) {
        config.error = 'multiple parsers provided'
      }
      return Object.assign({}, config, { parser: parsers.PACKAGE_GET_RESOURCES })
    },
    raw (config = initialConfig) {
      if (config.hasOwnProperty('parser')) {
        config.error = 'multiple parsers provided'
      }
      return Object.assign({}, config, { parser: parsers.RAW })
    },
    resourceGetWithValidLocation (argument = initialConfig) {
      if (argument.hasOwnProperty('latitude') && argument.hasOwnProperty('longitude')) {
        const parser = { latitude: argument.latitude, longitude: argument.longitude }
        return (config = initialConfig) => {
          if (config.hasOwnProperty('parser')) {
            config.error = 'multiple parsers provided'
          }
          return Object.assign({}, config, { parser: parsers.RESOURCE_GET_WITH_VALID_LOCATION }, parser)
        }
      }
      return Object.assign({}, argument, { parser: parsers.RESOURCE_GET_WITH_VALID_LOCATION })
    }
  }
}
