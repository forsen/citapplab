import { getEndpoint } from './url'
const { fetch } = require('fetch-ponyfill')({})

const CKAN_VERSION = '3'

export const verify = (host) => {
  const url = getEndpoint(host)
  return fetch(url.concat(CKAN_VERSION))
  .then((result) => {
    if (result.status !== 200){
      throw 'not a valid ckan host'
    }
  })
}
