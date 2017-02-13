import {
  hostIsCkan,
  resolveUrl as ckanResolveUrl
} from './lib/ckan'

const { fetch } = require('fetch-ponyfill')({})

const verify = (url) => {
  return fetch(url)
}

export {
  ckanResolveUrl,
  hostIsCkan,
  verify
}
