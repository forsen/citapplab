export default () => {
  return {
    missingBaseUrl () {
      return new Error('The baseUrl is missing')
    }
  }
}
