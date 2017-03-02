export default (config) => {
  return {
    packages () {
      return Object.assign({}, config, { execute: 'packages' })
    },
    resources () {
      return Object.assign({}, config, { execute: 'resources' })
    }
  }
}
