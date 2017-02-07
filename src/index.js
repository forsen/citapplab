export const welcome = () => {
  const ENVIRONMENT_IS_REACT_NATIVE = typeof navigator === 'object' && navigator.product === 'ReactNative'
  const ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function'
  const ENVIRONMENT_IS_WEB = typeof window === 'object'
  const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'

  if (ENVIRONMENT_IS_REACT_NATIVE) {
    console.log('reactnative')
    return 'reactnative'
  } else if (ENVIRONMENT_IS_WORKER) {
    console.log('worker')
    return 'worker'
  } else if (ENVIRONMENT_IS_WEB) {
    console.log('web')
    return 'web'
  } else if (ENVIRONMENT_IS_NODE) {
    console.log('node')
    return 'node'
  } else {
    throw new Error('Unsupported environment for fetch-intercept')
  }
}
