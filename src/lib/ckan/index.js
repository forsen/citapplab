import { resolveURL } from './url'
import { Verifier } from './get'

const verify = Verifier()

const ckan = Object.assign({}, resolveURL, verify)

export default ckan
