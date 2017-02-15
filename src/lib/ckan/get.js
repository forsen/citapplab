import { getEndpoint } from './url'

export const get = (host, header, data) => {
  return fetch(host,data)
}

export const verify = (host) => {
  const url = getEndpoint(host)
  return fetch(url)
    .then((result) => {
      if (result.status !== 200){
        throw 'not a valid ckan host'
      }
    })
}
