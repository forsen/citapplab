import { getEndpoint } from './url'
import { verify } from './get'
import { action } from './action'
import * as actionTypes from './actionTypes'

const ckan = {
  action,
  actionTypes,
  getEndpoint,
  verify
}

export default ckan
