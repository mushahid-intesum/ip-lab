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

import moment from 'moment';

import { Header } from '../components';
import UserService from '../services/UserService'
import { ServerConfig } from '../config/ServerConfig'

const Home = () => {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [data, setData] = useState([])

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => {
    setName('')
    setId('')
    setSummary('')
    setStatus('')
    setUsers('')
    setStartDate('')
    setEndDate('')
    setEditModalOpen(false);
  }

  useEffect(() => {
    fetchTaskList()
  }, [])


  const statuses = [
    {
      value: "Ongoing",
      label: "Ongoing",
    },
    {
      value: "Open",
      label: "To do",
    },
    {
      value: "Done",
      label: "Done",
    },

    {
      value: "Testing",
      label: "Testing",
    },
  ];

  const fetchTaskList = async () => {
    const response = await UserService.instance.getTaskList()
    console.log(response)
    if (response.status) {

      const list = response.tasksList;

      for(let i = 0;i<list.length;i++)
      {
        list[i]['startDate'] = moment(list[i]['startDate']).utc().format('YYYY-MM-DD')
        list[i]['endDate'] = moment(list[i]['endDate']).utc().format('YYYY-MM-DD')
      }
      setData(response.tasksList)
    }
  }

  const handleAddNewProject = async () => {

    console.log(status)
    const payload = {
      projectName: name,
      summary: summary,
      status: status,
      assigedUsers: users,
      startDate: startDate,
      endDate: endDate
    }
    const response = await UserService.instance.addTask(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setSummary('')
      setStatus('')
      setUsers('')
      setStartDate('')
      setEndDate('')

      fetchTaskList()
      handleAddModalClose()

    }
  }

  const handleEdit = async () => {
    const payload = {
      projectId: id,
      projectName: name,
      summary: summary,
      status: status,
      assigedUsers: users,
      startDate: startDate,
      endDate: endDate
    }
    const response = await UserService.instance.editTask(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setSummary('')
      setStatus('')
      setUsers('')
      setStartDate('')
      setEndDate('')

      fetchTaskList()
      handleEditModalClose()

    }
  }

  const handleDelete = async () => {
    const payload = {
      projectId: id
    }

    const response = await UserService.instance.deleteTask(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setSummary('')
      setStatus('')
      setUsers('')
      setStartDate('')
      setEndDate('')

      fetchTaskList()
      handleEditModalClose()

    }
  }

  const rowSelected = (args) => {
    const project = args.data;
    setId(project['projectId'])
    setName(project['projectName'])
    setSummary(project['summary'])
    setStatus(project['projectStatus'])
    setUsers(project['assignedUsers'])
    setStartDate(project['startDate'])
    setEndDate(project['endDate'])

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
          <ColumnDirective field='summary' width='100' />
          <ColumnDirective field='startDate' width='100' />
          <ColumnDirective field='endDate' width='100' />
          {/* <ColumnDirective field='assignedUsers' width='100' /> */}
          <ColumnDirective field='status' width='100' />

        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Edit, Sort, CommandColumn, Filter]} />
      </GridComponent>


      <div>
        <Dialog
          open={addModalOpen}
          keepMounted
          onClose={handleAddModalClose}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-summary" component="form">
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
                    label="Summary"
                    multiline
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
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
                <div>
                  <TextField
                    select
                    SelectProps={{
                      native: true,
                    }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    helperText="Please select status"
                  >
                    {statuses.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
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
          aria-describedby="alert-dialog-slide-summary"
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
                    label="Summary"
                    multiline
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
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
                <div>
                  <TextField
                    select
                    SelectProps={{
                      native: true,
                    }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    helperText="Please select status"
                  // defaultValue='manager'
                  >
                    {statuses.map((option) => (
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

export default Home