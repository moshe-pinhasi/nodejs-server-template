import devConfig from './dev'
import prodConfig from './prod'

var config;

// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  config = prodConfig
} else {
  // we are in development - return the dev keys!!!
  config = devConfig
}

export default config