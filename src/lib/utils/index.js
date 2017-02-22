const { fetch } = require('fetch-ponyfill')({})

export const get = (host, header, data) => {
  return fetch(host, data)
}
