const normalizeHost = ( host ) => {
  return host.replace(/\/$/,"")
}

export const getEndpoint = ( host ) => {
  return normalizeHost(host).concat('/api/')
}
