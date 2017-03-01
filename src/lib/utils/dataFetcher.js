export default () => {
  return {
    fetch (request) {
      return fetch(request.url, request.options)
    }
  }
}
