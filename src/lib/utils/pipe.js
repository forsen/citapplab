export default (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))
