import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Selection, Search, Toolbar, CommandColumn, Edit, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid } from '../data/dummy';
import { useEffect, useState } from 'react'
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

import { useNavigate } from 'react-router-dom'

import moment from 'moment';

import { Header } from '../components';
// import ProjectService from '../services/ProjectService';
import ProjectService from "../services/ProjectService";
import { ServerConfig } from '../config/ServerConfig'

const Home = () => {

  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [data, setData] = useState([])

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const handleEditModalOpen = () => 
  {
    setEditModalOpen(true);
  }
  const handleEditModalClose = () => {
    setName('')
    setId('')
    setDescription('')
    setStartDate('')
    setEndDate('')
    setEditModalOpen(false);
  }

  useEffect(() => {
    const currentUser = localStorage.getItem("user")

    if(currentUser === "")
    {
      navigate("/signin");
    }
    fetchProjectsList()
  }, []) 


  const fetchProjectsList = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const response = await ProjectService.instance.getProjectList(user)
    console.log(response)
    if (response.status) {

      const list = response.projectList;

      for(let i = 0;i<list.length;i++)
      {
        list[i]['startDate'] = moment(list[i]['startDate']).utc().format('YYYY-MM-DD')
        list[i]['endDate'] = moment(list[i]['endDate']).utc().format('YYYY-MM-DD')
      }
      setData(response.projectList)
    }
  }

  const handleAddNewProject = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = {
      projectName: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
      projectManagerId: user.userId
    }
    const response = await ProjectService.instance.addProject(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setDescription('')
      setStartDate('')
      setEndDate('')

      fetchProjectsList()
      handleAddModalClose()

    }
  }

  const handleEdit = async () => {
    const payload = {
      projectId: id,
      projectName: name,
      description: description,
      startDate: startDate,
      endDate: endDate
    }
    const response = await ProjectService.instance.editProject(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setDescription('')
      setStartDate('')
      setEndDate('')

      fetchProjectsList()
      handleEditModalClose()

    }
  }

  const handleDelete = async () => {
    const payload = {
      projectId: id
    }

    const response = await ProjectService.instance.deleteProject(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setDescription('')
      setStartDate('')
      setEndDate('')

      fetchProjectsList()
      handleEditModalClose()

    }
  }

  const handleRoute = async () => {
    localStorage.setItem("currentProject", id);
    navigate('/team');
  }

  const rowSelected = (args) => {
    const project = args.data;
    setId(project['projectId'])
    setName(project['projectName'])
    setDescription(project['description'])
    setStartDate(project['startDate'])
    setEndDate(project['endDate'])

    console.log(project)

    handleEditModalOpen()
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Home" title= "Welcome to UtiliTool" />
      <Button onClick={handleAddModalOpen}>Add Projects</Button>
      <GridComponent
        dataSource={data}
        allowPaging
        allowSorting
        editSettings={{ allowDeleting: false, allowEditing: false, allowAdding: false }}
        width="auto"
        allowFiltering
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective field='projectId' width='100' />
          <ColumnDirective field='projectName' width='100' />
          <ColumnDirective field='description' width='100' />
          <ColumnDirective field='startDate' width='100' />
          <ColumnDirective field='endDate' width='100' />
          {/* <ColumnDirective field='assignedUsers' width='100' /> */}

        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Edit, Sort, CommandColumn, Filter]} />
      </GridComponent>


      <div>
        <Dialog
          open={addModalOpen}
          keepMounted
          // fullScreen
          onClose={handleAddModalClose}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" component="form">
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    form
                    id="outlined-disabled"
                    label="Project Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    form
                    id="outlined-password-input"
                    label="Description"
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    form
                    id="outlined-disabled"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <TextField
                    form
                    id="outlined-disabled"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddNewProject}>Add new project</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={editModalOpen}
          keepMounted
          onClose={handleEditModalClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
          <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    form
                    id="outlined-disabled"
                    label="Project Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    form
                    id="outlined-password-input"
                    label="Description"
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    form
                    id="outlined-disabled"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <TextField
                    form
                    id="outlined-disabled"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />

                </div>
              </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleRoute}>View Project Users</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default Home