export const makeRequests = (makeRequstsArguments) => {
  const {
    apiUrl,
    endpoint,
    parameters
  } = makeRequstsArguments

  const parametersList = parameters.reduce((list, parameter) => {
    return list + `?${parameter}`
  }, '')
  let request = {}
  request.url = apiUrl + endpoint + parametersList
  request.options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
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
