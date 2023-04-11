import utility from '../utility/utility'

const prod = {
  url: {
    // API_URL: 'http://127.0.0.1:5000/api/v1',
    API_URL: 'https://ip-lab-backend-production.up.railway.app/api/v1'
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
