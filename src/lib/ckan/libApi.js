import ActionApi from './actionApi'

const checkConfig = (config) => {
  if (config.error) {
    return config.error
  }
}

export default (initialConfig) => {
  const actionApi = ActionApi()
  return {
    packages (config = initialConfig) {
      const errorString = checkConfig(config)
      if (errorString) {
        return Promise.reject(errorString)
      }
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
    resource (argument = initialConfig) {
      if (typeof (argument) === 'string' || Array.isArray(argument)) {
        return (config = initialConfig) => {
          const errorString = checkConfig(config)
          if (errorString) {
            console.log('neid')
            return Promise.reject(errorString)
          }

          if (Array.isArray(argument)) {
            const promises = argument.map((item) => {
              const parameters = Object.assign({}, config.parameters, {id: item})
              const thisConfig = Object.assign({}, config, {parameters: parameters})
              return actionApi.resource(thisConfig)
            })
            return Promise.all(promises)
          }
          const parameters = Object.assign({}, config.parameters, {id: argument})
          const thisConfig = Object.assign({}, config, {parameters: parameters})
          return actionApi.resource(thisConfig)
        }
      }
      const errorString = checkConfig(argument)
      if (errorString) {
        return Promise.reject(errorString)
      }

      const resourceParser = argument.parser

      const thisConfig = Object.assign({}, argument, {
        parameters: Object.keys(argument.parameters).reduce((result, key) => {
          if (key === 'limit') {
            result['rows'] = argument.parameters['limit']
          } else if (key === 'offset') {
            result['start'] = argument.parameters['offset']
          } else {
            result[key] = argument.parameters[key]
          }
          return result
        }, {}),
        parser: ''
      })
      return actionApi.packages(thisConfig)
        .then((response) => {
          return response.map((item) => {
            const title = item.title
            const promises = item.resources.map((res) => {
              const parameters = {id: res.id}
              const myConf = {...thisConfig, parameters, parser: resourceParser}
              return actionApi.resource(myConf)
            })
            return {title: title, promises: promises}
          })
        })
    }
  }
}
