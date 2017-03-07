import ActionApi from './actionApi'

export default (initialConfig) => {
  const actionApi = ActionApi()
  return {
    packages (config = initialConfig) {
      const thisConfig = Object.assign({}, config, {
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
      })
      return actionApi.packages(thisConfig)
    },
    resource (id) {
      if (typeof (id) !== 'string') {
        throw new Error('resource must be called with an argument as string')
      }
      return (config = initialConfig) => {
        const parameters = Object.assign({}, config.parameters, { id: id })
        const thisConfig = Object.assign({}, config, { parameters: parameters })
        return actionApi.resource(thisConfig)
      }
    }
  }
}
