export const makeRequests = (apiUrl, endpoint, parameters) => {
  const _parameters = parameters || ''
  let request = {}
  request.url = apiUrl + endpoint + _parameters
  request.options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request
}
