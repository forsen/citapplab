export default (config) => {
  return {
    packages () {
      return Object.assign({}, config, { execute: 'packages' })
    },
    resources (id) {
      const execute = {
        execute: 'resources'
      }
      if (typeof (id) === 'string') {
        return () => {
          const parameters = Object.assign({}, config.parameters, { id: id })
          return Object.assign({}, config, execute, { parameters: parameters })
        }
      }
      return Object.assign({}, config, { execute: 'resources' })
    }
  }
}
