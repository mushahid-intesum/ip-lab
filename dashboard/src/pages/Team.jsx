import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Selection, Search, Toolbar, CommandColumn, Edit, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid } from '../data/dummy';
import { useEffect, useState } from 'react'
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';


import { Header } from '../components';
// import ProjectService from '../services/ProjectService';
import ProjectService from '../services/ProjectService';
import UserService from '../services/UserService';
import { ServerConfig } from '../config/ServerConfig'
// ServerConfig.url.API_URL + '/get_all_users/'
import { useNavigate } from 'react-router-dom'


const Team = () => {
  const navigate = useNavigate()

  const roles = [
    {
      value: 'Manager',
      label: 'manager',
    },
    {
      value: 'Developer',
      label: 'developer',
    },
  ];

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const handleEditModalOpen = () => setEditModalOpen(true);

  const handleEditModalClose = () => {
    setName('')
    setPassword('')
    setEmail('')
    setRole('')
    setEditModalOpen(false);
  }

  const [projectUserData, setProjectUserData] = useState([])

  useEffect(() => {
  
    const currentUser = localStorage.getItem("user")

    if(currentUser === "" || currentUser === null)
    {
      navigate("/signin");
    }
    const currentProject = localStorage.getItem("currentProject");

    if(currentProject === "" || currentProject === null)
    {
      alert("Please select a project")
      navigate("/home");
    }
    fetchProjectUserList();
  }, [])

  const fetchProjectUserList = async () => {

    const projectId = localStorage.getItem("currentProject")


    const payload = {
      projectId: projectId,
    }
    const response = await ProjectService.instance.getProjectUsers(payload)
    console.log(response)
    if (response.status) {
      setProjectUserData(response.userList)
    }
  }

  const handleAddNewUser = async () => {
    navigate('/project_users');
  }

  const handleEdit = async () => {
    const projectId = localStorage.getItem("currentProject")
    const payload = {
      userRole: role,
      userId: id,
      projectId: projectId
    }
    const response = await ProjectService.instance.updateProjectUser(payload)
    console.log(response)
    if (response.status) {
      setRole('')

      fetchProjectUserList()
      handleEditModalClose()
    }
  }

  const handleDelete = async () => {
    const payload = {
      userId: id
    }

    const response = await ProjectService.instance.deleteUser(payload)
    console.log(response)
    if (response.status) {
      setId('')
      setName('')
      setPassword('')
      setEmail('')
      setRole('')

      fetchProjectUserList()
      handleEditModalClose()
    }
  }

  const rowSelected = (args) => {
    const user = args.data;
    setId(user['userId'])
    setName(user['userName'])
    setEmail(user['userEmail'])
    setRole(user['userRole'])
    handleEditModalOpen()
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Management" title="Team" />
      <Button onClick={handleAddNewUser}>Add Users</Button>
      <GridComponent
        dataSource={projectUserData}
        allowPaging
        allowSorting
        editSettings={{ allowDeleting: false, allowEditing: false, allowAdding: false }}
        width="auto"
        allowFiltering
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective field='userId' width='100' />
          <ColumnDirective field='userName' width='100' />
          <ColumnDirective field='userEmail' width='100' />
          <ColumnDirective field='userRole' width='100' />

        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Edit, Sort, CommandColumn, Filter]} />
      </GridComponent>


      <div>
        <Dialog
          open={editModalOpen}
          keepMounted
          onClose={handleEditModalClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Edit User"}</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
                <TextField
                  form
                  id="outlined-disabled"
                  label="UserId"
                  type="text"
                  value={id}
                />
              <div>
                <TextField
                  form
                  id="outlined-disabled"
                  label="User Name"
                  type="text"
                  value={name}
                />
                <TextField
                  form
                  id="outlined-disabled"
                  disabled
                  label="Email"
                  type="email"
                  value={email}
                />
                <TextField
                  select
                  SelectProps={{
                    native: true,
                  }}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  helperText="Please select role"
                  defaultValue='manager'
                >
                  {roles.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleEdit}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}


export default Team