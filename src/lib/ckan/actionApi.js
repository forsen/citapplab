export default (dataFetcher, config, makeRequests) => {
  return {
    listAllPackages () {
      const request = makeRequests(config.apiUrl, 'package_list')
      return dataFetcher.fetch(request.url, request.options)
    },
    listAllPackagesWithResources () {
      const request = makeRequests(config.apiUrl, 'current_package_list_with_resources')
      return dataFetcher.fetch(request.url, request.options)
    },
    searchPackages () {
      const request = makeRequests(config.apiUrl, 'package_search')
      return dataFetcher.fetch(request.url, request.options)
    }
  }
}
