export default () => {
  return {
    checkResponse (response) {
      return new Promise((resolve, reject) => {
        if (response.success === true) {
          resolve(response)
        } else {
          let error = new Error(response.error.message)
          error.type = response.error.__type
          error.response = response
          reject(error)
        }
      })
    }
  }
}

