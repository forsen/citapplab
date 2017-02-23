const Query = () => {
  return {
    query (fetch, url, options) {
      return fetch(url, options)
        .then((response) => response.json())
    }
  }
}

export {
  Query
}
