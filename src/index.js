import fetchIntercept from './fetch-intercept'
import ckan from './lib/ckan'

const BACKEND = 'CKAN'

const resolveUrl = (url, config) => {
  switch (BACKEND) {
    case 'CKAN':
      url = ckan.resolveURL(url)
  }
  return [
    url,
    config
  ]
}

const register = () => {
  return fetchIntercept.register({
    request: (url, config) => {
      return resolveUrl(url, config)
    },
    requestError: error => Promise.reject(error),
    response: response => response,
    responseError: error => Promise.reject(error)
  })
}

const citapplab = {
  ckan,
  register,
  fetchIntercept
}

export default citapplab
