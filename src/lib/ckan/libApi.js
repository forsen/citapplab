export default (config) => {
  return {
    packages () {
      return Object.assign({}, config, { execute: 'packages' })
    },
    resource (id) {
      if (id === undefined) {
        throw new Error('resource must be called with an argument as string')
      }
      const execute = {
        execute: 'resource'
      }
      if (typeof (id) === 'string') {
        return () => {
          const parameters = Object.assign({}, config.parameters, { id: id })
          return Object.assign({}, config, execute, { parameters: parameters })
        }
      }
      return Object.assign({}, config, execute)
    }
  }
}
