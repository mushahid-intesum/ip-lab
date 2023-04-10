import utility from '../utility/utility'

const prod = {
  url: {
    // API_URL: 'http://35.224.190.237:2526',
    API_URL: 'http://127.0.0.1:5000/api/v1'
  },
}
const dev = {
  url: {
    API_URL: 'http://127.0.0.1:5000/api/v1',
  },
}

function getEnvConfig() {
  var config
  if (utility.removeSpace(process.env.REACT_APP_ENV_VAR) === 'development') {
    config = dev
  } else {
    config = prod
    // config = dev
  }
  console.log(config)
  return config
}

export const ServerConfig = getEnvConfig()
