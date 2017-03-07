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
      if (typeof (id) !== 'string' && !Array.isArray(id)) {
        throw new Error('resource must be called with an argument as string or array of strings')
      }
      return (config = initialConfig) => {
        if (Array.isArray(id)) {
          const promises = id.map((item) => {
            const parameters = Object.assign({}, config.parameters, { id: item })
            const thisConfig = Object.assign({}, config, { parameters: parameters })
            return actionApi.resource(thisConfig)
          })
          return Promise.all(promises)
        }
        const parameters = Object.assign({}, config.parameters, { id: id })
        const thisConfig = Object.assign({}, config, { parameters: parameters })
        return actionApi.resource(thisConfig)
      }
    }
  }
}
