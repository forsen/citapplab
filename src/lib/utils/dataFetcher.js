export default (fetch) => {
  return {
    fetch (url, options) {
      return fetch(url, options)
    }
  }
}
