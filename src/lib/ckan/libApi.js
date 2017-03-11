import ActionApi from './actionApi'

export default (initialConfig) => {
  const actionApi = ActionApi()
  return {
    packages (config = initialConfig) {
      return actionApi.packages(config)
    },
    resource (argument = initialConfig) {
      if (typeof (argument) === 'string' || Array.isArray(argument)) {
        return (config = initialConfig) => {
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

      const resourceParser = argument.parser

      return actionApi.packages(argument)
        .then((response) => {
          return response.map((item) => {
            const title = item.title
            const promises = item.resources.map((res) => {
              const parameters = {id: res.id}
              const myConf = {...argument, parameters, parser: resourceParser}
              return actionApi.resource(myConf)
            })
            return {title: title, promises: promises}
          })
        })
    }
  }
}
