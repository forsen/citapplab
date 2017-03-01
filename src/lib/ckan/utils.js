export const makeRequests = (config, endpoint, parameters) => {
  const _parameters = parameters || ''
  let request = {}
  request.url = config.apiUrl + endpoint + _parameters
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
    resourceParser (promise) {
      return new Promise((resolve) => {
        promise
          .then((response) => {
            return response.json()
          })
          .then((jsonResponse) => {
            resolve(jsonResponse)
          })
      })
    },
    packageParser (promise) {
      return new Promise((resolve) => {
        promise
          .then((response) => response.json())
          .then((jsonResponse) => {
            resolve(jsonResponse)
          })
      })
    }
  }
}
