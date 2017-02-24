const MissingBaseUrl = () => {
  return {
    error () {
      return new Error('The baseUrl is missing')
    }
  }
}

export {
  MissingBaseUrl
}
