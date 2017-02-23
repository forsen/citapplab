import Get from '../utils'
import { Query } from './actions'

const get = Get()

const query = Query()

const ngsi = () => {
  return Object.assign({}, query, get)
}

export default ngsi
