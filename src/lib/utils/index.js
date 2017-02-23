export default () => {
  return {
    get (fetch, baseData) {
      fetch(baseData.url)
    }
  }
}
