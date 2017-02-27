import { DataFetcher } from '../utils'
import { Query } from './actions'

const dataFetcher = DataFetcher()

const query = Query()

const ngsi = () => {
  return Object.assign({}, query, dataFetcher)
}

export default ngsi
