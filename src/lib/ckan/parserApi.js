import { constants as parsers } from './ckanParsers'
export default (initialConfig) => {
  return {
    packageGetResources (config = initialConfig) {
      if (config.hasOwnProperty('parser')) {
        config.error = 'multiple parsers provided'
      }
      return Object.assign({}, config, { parser: parsers.PACKAGE_GET_RESOURCES })
    }
  }
}
