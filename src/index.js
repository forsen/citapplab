const {fetch} = require('fetch-ponyfill')({})

export const verify = () => {
  return fetch('https://data.smartbydata.no/api/action/datastore_search?resource_id=56c2c722-5594-4005-ad92-d4e667b67663&limit=5')
}

