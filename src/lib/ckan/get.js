const Verifier = () => {
  return {
    verify (fetch, url) {
      return fetch(url + '/api/3')
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('not a valid ckan endpoint')
          }
        })
    }
  }
}

export {
  Verifier
}
