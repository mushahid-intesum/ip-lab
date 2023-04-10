import { ServerConfig } from '../config/ServerConfig'
import { ClientEnum } from '../config/ClientEnum'
import axios from 'axios'

export default class DefaultService {
  static instance = DefaultService.instance || new DefaultService()

  getHeader() {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // authorization: JSON.parse(localStorage.getItem('authCredential'))['jwtToken']
      },
    }
  }

  defaultResponse() {
    return {
      status: false,
      responseMessage: ClientEnum.RESPONSE_CONNECTION_ERROR,
    }
  }

  async login(payload) {
    let retry = 0

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + '/login/')
      try {
        const loginResponse = await axios.post(
          ServerConfig.url.API_URL + '/login/',
          payload,
          DefaultService.instance.getHeader(),
        )

        switch (loginResponse.data.responseMessage) {
          default:
            return loginResponse.data
        }
      } catch (error) {
        console.log('Error in login in services/DefaultService.js')
        console.log(error)
        retry++
      }
    }
    return DefaultService.instance.defaultResponse()
  }





}


