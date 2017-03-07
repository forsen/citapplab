import Ngsi from './lib/ngsi'
import Ckan from './lib/ckan'
import { compose, pipe } from './lib/utils'

const citapplab = {
  Ckan,
  Ngsi
}

export {
  compose,
  pipe
}

export default citapplab
