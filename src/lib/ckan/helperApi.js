import ActionApi from './actionApi'

export default () => {
  return {
    limit (argument) {
      if (typeof (argument) === 'number') {
        return (config) => {
          const parameters = [...config.parameters, 'limit=' + argument]
          return Object.assign({}, config, {parameters: parameters})
        }
      }
      return Object.assign({}, argument, {parameters: [...argument.parameters, 'limit=5']})
    },
    offset (config) {
      return config
    },
    flatten (config) {
      return config
    },
    execute (config) {
      const actionApi = ActionApi(config)
      let promise
      switch (config.execute) {
        case 'resources':
          promise = actionApi.datastoreSearch()
          break
        case 'packages':
          promise = actionApi.listAllPackages()
          break
        default:
          promise = Promise.reject('something went wrong')
      }
      return promise
    }
  }
}
