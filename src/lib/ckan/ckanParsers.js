export const constants = {
  PACKAGE_DEFAULT: 'package_default',
  PACKAGE_GET_RESOURCES: 'package_get_resources',
  RESOURCE_DEFAULT: 'resource_default',
  RESOURCE_GET_WITH_VALID_LOCATION: 'resource_get_with_valid_location',
  RAW: 'raw'
}
export default () => {
  return {
    packageGetResources (response) {
      console.log(response)
      const resourceArray = response.result.results.reduce((resources, ckanPackage) => {
        ckanPackage.resources.forEach((resource) => {
          resources.push(resource.id)
        })
        return resources
      }, [])
      return new Promise((resolve) => {
        resolve(resourceArray)
      })
    },
    packageDefault (response) {
      return new Promise((resolve) => {
        resolve(response.result.results)
      })
    },
    raw (response) {
      return new Promise((resolve) => {
        resolve(response)
      })
    },
    resourceDefault (response) {
      return new Promise((resolve) => {
        resolve(response.result.records)
      })
    },
    resourceGetWithValidLocation (response) {
      const result = response.result.records.reduce((acc, record) => {
        record.Latitude = parseFloat(record.Latitude)
        record.Longitude = parseFloat(record.Longitude)

        if (
          record.Latitude !== record.Latitude ||
          record.Longitude !== record.Longitude ||
          record.Latitude === 0 ||
          record.Longitude === 0
        ) {
          return acc
        }
        acc.push(record)
        return acc
      }, [])

      console.log(result)
      return new Promise((resolve) => {
        resolve(result)
      })
    }
  }
}
