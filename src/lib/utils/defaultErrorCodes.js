export default () => {
  return {
    missingBaseUrl () {
      return new Error('The baseUrl is missing')
    },
    missingConfig () {
      return new Error('A configuration is needed')
    }
  }
}
