export default (dataFetcher, config, makeRequests, parsers) => {
  return {
    listAllPackages () {
      const request = makeRequests(config, 'package_list')
      return dataFetcher.fetch(request.url, request.options)
    },
    listAllPackagesWithResources () {
      const request = makeRequests(config, 'current_package_list_with_resources')
      return dataFetcher.fetch(request.url, request.options)
    },
    searchPackages () {
      return parsers.packageParser(dataFetcher.fetch(makeRequests(config, 'package_search')))
    },
    datastoreSearch () {
      return parsers.datastoreParser(dataFetcher.fetch(makeRequests(config, 'datastore_search')))
    }
  }
}
