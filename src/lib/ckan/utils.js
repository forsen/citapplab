export const makeRequests = (makeRequstsArguments) => {
  const {
    apiUrl,
    endpoint,
    parameters
  } = makeRequstsArguments

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

export const Parsers = () => {
  return {
    resourceParser (response) {
      return new Promise((resolve) => {
        resolve(response)
      })
    },
    packageParser (response) {
      return new Promise((resolve) => {
        resolve(response)
      })
    }
  }
}
