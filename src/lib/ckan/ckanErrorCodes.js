export default () => {
  return {
    invalidCkanUri () {
      return new Error('Provided baseUrl does not contain a valid ckan api')
    }
  }
}
