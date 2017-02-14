import {
  action,
  actionTypes,
  getEndpoint as ckanGetEndpoint,
  verify as ckanVerify
} from './lib/ckan'

const citapplab = {
  action,
  actionTypes,
  ckanGetEndpoint,
  ckanVerify
}
export default citapplab
