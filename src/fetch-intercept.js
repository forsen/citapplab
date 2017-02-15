/*
 The MIT License (MIT)

 Copyright (c) 2015 werk85

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/*
 * Configuration for React-Native's package system
 * @providesModule fetch-ponyfill
 */

const { fetch } = require('fetch-ponyfill')({})
// Uses Emscripten stategy for determining environment
const ENVIRONMENT_IS_REACT_NATIVE = typeof navigator === 'object' && navigator.product === 'ReactNative'
const ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function'
const ENVIRONMENT_IS_WEB = typeof window === 'object'
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'

if (ENVIRONMENT_IS_REACT_NATIVE) {
  attach(global)
} else if (ENVIRONMENT_IS_WORKER) {
  attach(self)
} else if (ENVIRONMENT_IS_WEB) {
  attach(window)
} else if (ENVIRONMENT_IS_NODE) {
  attach(global)
} else {
  throw new Error('Unsupported environment for fetch-intercept')
}

function attach (env) {
  env.fetch = (function (fetch) {
    return function (...args) {
      return interceptor(fetch, ...args)
    }
  })(fetch)
}

let interceptors = []

function interceptor (fetch, ...args) {
  const reversedInterceptors = interceptors.reduce((array, interceptor) => [interceptor].concat(array), [])
  let promise = Promise.resolve(args)

  // Register request interceptors
  reversedInterceptors.forEach(({ request, requestError }) => {
    if (request || requestError) {
      promise = promise.then(args => request(...args), requestError)
    }
  })

  // Register fetch call
  promise = promise.then(args => fetch(...args))

  // Register response interceptors
  reversedInterceptors.forEach(({ response, responseError }) => {
    if (response || responseError) {
      promise = promise.then(response, responseError)
    }
  })

  return promise
}

module.exports = {
  register: function (interceptor) {
    interceptors.push(interceptor)
    return () => {
      const index = interceptors.indexOf(interceptor)
      if (index >= 0) {
        interceptors.splice(index, 1)
      }
    }
  },
  clear: function () {
    interceptors = []
  }
}
