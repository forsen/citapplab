import { get } from './get'
import { getActionEndpoint } from './url'
import {
  CURRENT_PACKAGE_LIST_WITH_RESOURCES,
  GROUP_LIST,
  PACKAGE_LIST,
  REVISION_LIST
} from './actionTypes'

export const action = (host, actionType) => {
  const url = getActionEndpoint(host)
  switch (actionType) {
    case GROUP_LIST:
      return get(url.concat(GROUP_LIST))
    case PACKAGE_LIST:
      return get(url.concat(PACKAGE_LIST))
    case CURRENT_PACKAGE_LIST_WITH_RESOURCES:
      return get(url.concat(CURRENT_PACKAGE_LIST_WITH_RESOURCES))
    case REVISION_LIST:
      return get(url.concat(REVISION_LIST))
    case undefined:
      return Promise.reject('missing required actiontype')
    default:
      return Promise.reject('not a valid actiontype')
  }
}