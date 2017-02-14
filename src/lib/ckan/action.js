import { get } from './get'
import { getActionEndpoint } from './url'
import {
  GROUP_LIST
} from './actionTypes'

export const action = (host, actionType) => {
  const url = getActionEndpoint(host)
  switch (actionType) {
    case GROUP_LIST:
      return get(url.concat(GROUP_LIST))
    case undefined:
      return Promise.reject('missing required actiontype')
    default:
      return Promise.reject('not a valid actiontype')
  }
}