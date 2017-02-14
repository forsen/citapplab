const CKAN_VERSION = '3'

const normalizeHost = ( host ) => {
  return host.replace(/\/$/,"")
}

export const getEndpoint = ( host ) => {
  return normalizeHost(host).concat('/api/',CKAN_VERSION)
}

export const getActionEndpoint = ( host ) => {
  return getEndpoint(host).concat('/action')
}
