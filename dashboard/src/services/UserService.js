import { ServerConfig } from '../config/ServerConfig'
import DefaultService from './DefaultService'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

class UserService{

    static instance = UserService.instance || new UserService()

    async login(payload)
    {
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
            console.log('Error in login in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }

    async signup(payload)
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/create_new_user/')
          try {
            const signupResponse = await axios.post(
              ServerConfig.url.API_URL + '/create_new_user/',
              payload,
              DefaultService.instance.getHeader(),
            )
    
            switch (signupResponse.data.responseMessage) {
              default:
                return signupResponse.data
            }
          } catch (error) {
            console.log('Error in signup in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }
    

    async getUserList()
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/get_all_users/')
          try {
            const getUserListResponse = await axios.post(
              ServerConfig.url.API_URL + '/get_all_users/',
              DefaultService.instance.getHeader(),
            )
    
            switch (getUserListResponse.data.responseMessage) {
              default:
                return getUserListResponse.data
            }
          } catch (error) {
            console.log('Error in getUserList in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }

    async getUsersNotInProjectList(payload)
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/get_users_not_in_project/')
          try {
            const getUsersNotInProjectListResponse = await axios.post(
              ServerConfig.url.API_URL + '/get_users_not_in_project/',
              payload,
              DefaultService.instance.getHeader(),
            )
    
            switch (getUsersNotInProjectListResponse.data.responseMessage) {
              default:
                return getUsersNotInProjectListResponse.data
            }
          } catch (error) {
            console.log('Error in getUsersNotInProjectList in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }

    async addUser(payload)
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/create_user/')
          try {
            const addUserResponse = await axios.post(
              ServerConfig.url.API_URL + '/create_user/',
              payload,
              DefaultService.instance.getHeader(),
            )
    
            switch (addUserResponse.data.responseMessage) {
              default:
                return addUserResponse.data
            }
          } catch (error) {
            console.log('Error in addUser in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }

    async editUser(payload)
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/update_user/')
          try {
            const editUserResponse = await axios.post(
              ServerConfig.url.API_URL + '/update_user/',
              payload,
              DefaultService.instance.getHeader(),
            )
    
            switch (editUserResponse.data.responseMessage) {
              default:
                return editUserResponse.data
            }
          } catch (error) {
            console.log('Error in editUser in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }

    async deleteUser(payload)
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/delete_user/')
          try {
            const deleteUserResponse = await axios.post(
              ServerConfig.url.API_URL + '/delete_user/',
              payload,
              DefaultService.instance.getHeader(),
            )
    
            switch (deleteUserResponse.data.responseMessage) {
              default:
                return deleteUserResponse.data
            }
          } catch (error) {
            console.log('Error in deleteUser in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }


}

export default UserService;