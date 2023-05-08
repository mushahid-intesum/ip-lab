import { ServerConfig } from '../config/ServerConfig'
import DefaultService from './DefaultService'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

class ProjectService {

    static instance = ProjectService.instance || new ProjectService()

    async addUsersToProject(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/add_users_to_project/')
            try {
                const addUserToProjectResponse = await axios.post(
                    ServerConfig.url.API_URL + '/add_users_to_project/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (addUserToProjectResponse.data.responseMessage) {
                    default:
                        return addUserToProjectResponse.data
                }
            } catch (error) {
                console.log('Error in addUsersToProject in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async updateProjectUser(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/update_project_user/')
            try {
                const updateProjectUserResponse = await axios.post(
                    ServerConfig.url.API_URL + '/update_project_user/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (updateProjectUserResponse.data.responseMessage) {
                    default:
                        return updateProjectUserResponse.data
                }
            } catch (error) {
                console.log('Error in updateProjectUser in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }


    async getProjectUsers(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/get_project_users/')
            try {
                const getProjectUserResponse = await axios.post(
                    ServerConfig.url.API_URL + '/get_project_users/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (getProjectUserResponse.data.responseMessage) {
                    default:
                        return getProjectUserResponse.data
                }
            } catch (error) {
                console.log('Error in getProjectUsers in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async addTask(payload) {
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



    async getTaskList() {
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

    async editTask(payload) {
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

    async deleteTask(payload) {
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

    async addProject(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/create_new_project/')
            try {
                const addProjectResponse = await axios.post(
                    ServerConfig.url.API_URL + '/create_new_project/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (addProjectResponse.data.responseMessage) {
                    default:
                        return addProjectResponse.data
                }
            } catch (error) {
                console.log('Error in addProject in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async getProjectList(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/get_all_projects/')
            try {
                const getProjectListResponse = await axios.post(
                    ServerConfig.url.API_URL + '/get_all_projects/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (getProjectListResponse.data.responseMessage) {
                    default:
                        return getProjectListResponse.data
                }
            } catch (error) {
                console.log('Error in getProjectList in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async editProject(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/update_project/')
            try {
                const editProjectResponse = await axios.post(
                    ServerConfig.url.API_URL + '/update_project/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (editProjectResponse.data.responseMessage) {
                    default:
                        return editProjectResponse.data
                }
            } catch (error) {
                console.log('Error in editProject in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async deleteProject(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/delete_project/')
            try {
                const deleteProjectResponse = await axios.post(
                    ServerConfig.url.API_URL + '/delete_project/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (deleteProjectResponse.data.responseMessage) {
                    default:
                        return deleteProjectResponse.data
                }
            } catch (error) {
                console.log('Error in deleteProject in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async addRepo(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/add_new_repo/')
            try {
                const addRepoResponse = await axios.post(
                    ServerConfig.url.API_URL + '/add_new_repo/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (addRepoResponse.data.responseMessage) {
                    default:
                        return addRepoResponse.data
                }
            } catch (error) {
                console.log('Error in addRepo in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }


    async getRepoList() {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/get_all_repo/')
            try {
                const getRepoListResponse = await axios.post(
                    ServerConfig.url.API_URL + '/get_all_repo/',
                    DefaultService.instance.getHeader(),
                )

                switch (getRepoListResponse.data.responseMessage) {
                    default:
                        return getRepoListResponse.data
                }
            } catch (error) {
                console.log('Error in getRepoList in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async editRepo(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/update_repo/')
            try {
                const editRepoResponse = await axios.post(
                    ServerConfig.url.API_URL + '/update_repo/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (editRepoResponse.data.responseMessage) {
                    default:
                        return editRepoResponse.data
                }
            } catch (error) {
                console.log('Error in editRepo in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async deleteRepo(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/delete_repo/')
            try {
                const deleteRepoResponse = await axios.post(
                    ServerConfig.url.API_URL + '/delete_repo/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (deleteRepoResponse.data.responseMessage) {
                    default:
                        return deleteRepoResponse.data
                }
            } catch (error) {
                console.log('Error in deleteRepo in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }

    async getRepoReport(payload) {
        let retry = 0

        while (retry++ < 2) {
            console.log(ServerConfig.url.API_URL + '/get_commit_report/')
            try {
                const getRepoReportResponse = await axios.post(
                    ServerConfig.url.API_URL + '/get_commit_report/',
                    payload,
                    DefaultService.instance.getHeader(),
                )

                switch (getRepoReportResponse.data.responseMessage) {
                    default:
                        return getRepoReportResponse.data
                }
            } catch (error) {
                console.log('Error in getRepoReport in services/UserService.js')
                console.log(error)
                retry++
            }
        }
        return DefaultService.instance.defaultResponse()
    }
}



export default ProjectService;