import { get } from '../utils'

const query = (state) => ({
  query: () => {
    return new Promise((resolve) => {
      get(state.url)
        .then((response) => response.json())
        .then((jsonData) => resolve(jsonData))
    })
  }
})

const ngsi = (url, options) => {
  let state = {
    url,
    options
  }
  return Object.assign({}, query(state))
}

export default ngsi
