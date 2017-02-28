/* @flow */
export type dataFetcher = {fetch: Function}
export default (fetch: Function) => {
  return {
    fetch (url: string, options: Array<string>) {
      return fetch(url, options)
    }
  }
}
