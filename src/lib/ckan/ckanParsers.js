export const constants = {
  PACKAGE_DEFAULT: 'package_default',
  PACKAGE_GET_RESOURCES: 'package_get_resources',
  RESOURCE_DEFAULT: 'resource_default',
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
    }
  }
}
