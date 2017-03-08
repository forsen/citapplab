export const makeRequests = (makeRequestsArguments) => {
  const {
    apiUrl,
    endpoint,
    parameters
  } = makeRequestsArguments

  let request = {}
  request.url = apiUrl + endpoint
  request.options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }

  const escape = encodeURIComponent
  const query = Object.keys(parameters)
    .map((key) => `${escape(key)}=${escape(parameters[key])}`)
    .join('&')

  if (query) {
    request.url += `?${query}`
  }

  return request
}
