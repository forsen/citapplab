export default () => {
  return {
    checkResponse (promise) {
      return promise
        .then((response) => {
          if (response.success === true) {
            return response
          } else {
            let error = new Error(response.error.message)
            console.log()
            error.type = response.error.__type
            error.response = response
            throw error
          }
        })
    }
  }
}
