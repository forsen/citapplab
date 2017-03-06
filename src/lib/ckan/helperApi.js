import ActionApi from './actionApi'

export default () => {
  return {
    execute (config) {
      const actionApi = ActionApi(config)
      let promise
      switch (config.execute) {
        case 'resource':
          promise = actionApi.resource()
          break
        case 'packages':
          promise = actionApi.packages()
          break
        default:
          promise = Promise.reject('something went wrong')
      }
      return promise
    },
    flatten (config) {
      return config
    },
    limit (argument) {
      if (typeof (argument) !== 'object') {
        return (config) => {
          const myArgument = typeof (argument) === 'number' ? argument : 5
          const parameter = config.execute === 'packages' ? { rows: myArgument } : { limit: myArgument }
          const parameters = Object.assign({}, config.parameters, parameter)
          return Object.assign({}, config, {parameters: parameters})
        }
      }
      const parameter = argument.execute === 'packages' ? { rows: 5 } : { limit: 5 }
      const parameters = Object.assign({}, argument.parameters, parameter)
      return Object.assign({}, argument, {parameters: parameters})
    },
    offset (number) {
      if (typeof (number) !== 'number') {
        throw new Error('Argument is required and must be of type number')
      }
      return (config) => {
        if (!config.parameters.hasOwnProperty('limit')) {
          throw new Error('Offset can only be called after limit has been called')
        }

        const parameter = config.execute === 'packages' ? { start: number } : { offset: number }
        const parameters = Object.assign({}, config.parameters, parameter)
        return Object.assign({}, config, {parameters: parameters})
      }
    },
    tag (tag) {
      if (typeof (tag) !== 'string') {
        throw new Error('Argument is required and must be of type string')
      }
      return (config) => {
        const parameters = Object.assign({}, config.parameters, {fq: 'tags:' + tag})
        return Object.assign({}, config, {parameters: parameters})
      }
    },
    query (queryString) {
      if (typeof (queryString) !== 'string') {
        throw new Error('Argument is required and must be of type string')
      }
      return (config) => {
        const parameters = Object.assign({}, config.parameters, {q: queryString})
        return Object.assign({}, config, {parameters: parameters})
      }
    }
  }
}
