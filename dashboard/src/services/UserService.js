import { ServerConfig } from '../config/ServerConfig'
import DefaultService from './DefaultService'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

class UserService{

    static instance = UserService.instance || new UserService()

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

    async addTask(payload)
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/create_task/')
          try {
            const addTaskResponse = await axios.post(
              ServerConfig.url.API_URL + '/create_task/',
              payload,
              DefaultService.instance.getHeader(),
            )
    
            switch (addTaskResponse.data.responseMessage) {
              default:
                return addTaskResponse.data
            }
          } catch (error) {
            console.log('Error in addTask in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }

    async getTaskList()
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/get_all_tasks/')
          try {
            const getTaskListResponse = await axios.post(
              ServerConfig.url.API_URL + '/get_all_tasks/',
              DefaultService.instance.getHeader(),
            )
    
            switch (getTaskListResponse.data.responseMessage) {
              default:
                return getTaskListResponse.data
            }
          } catch (error) {
            console.log('Error in getTaskList in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }

    async editTask(payload)
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/update_task/')
          try {
            const editTaskResponse = await axios.post(
              ServerConfig.url.API_URL + '/update_task/',
              payload,
              DefaultService.instance.getHeader(),
            )
    
            switch (editTaskResponse.data.responseMessage) {
              default:
                return editTaskResponse.data
            }
          } catch (error) {
            console.log('Error in editTask in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }

    async deleteTask(payload)
    {
        let retry = 0

        while (retry++ < 2) {
          console.log(ServerConfig.url.API_URL + '/delete_task/')
          try {
            const deleteTaskResponse = await axios.post(
              ServerConfig.url.API_URL + '/delete_task/',
              payload,
              DefaultService.instance.getHeader(),
            )
    
            switch (deleteTaskResponse.data.responseMessage) {
              default:
                return deleteTaskResponse.data
            }
          } catch (error) {
            console.log('Error in deleteTask in services/UserService.js')
            console.log(error)
            retry++
          }
        }
        return DefaultService.instance.defaultResponse()
    }
}

export default UserService;