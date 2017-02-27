export default (fetch = fetch) => {
  return {
    fetch (url, options) {
      return fetch(url, options)
    }
  }
}
