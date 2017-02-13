const { fetch } = require('fetch-ponyfill')({})

export const resolveUrl = ( host ) => {
  return host.concat('/api/action/datastore_search')
}

export const hostIsCkan = ( host ) => {
  const url = host.concat('/api/3')
  return fetch(url)
    .then((result) => {
      if (result.status !== 200)
        throw 'not a valid ckan host'
    })
}

