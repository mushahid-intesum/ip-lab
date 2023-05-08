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
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

import moment from 'moment';

import { Header } from '../components';
import ProjectService from '../services/ProjectService'
import { ServerConfig } from '../config/ServerConfig'

import { useNavigate } from 'react-router-dom'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Task = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [data, setData] = useState([])
  const [projectUsers, setProjectUsers] = useState([])

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = async () => {
    fetchProjectUserList();
    console.log(projectUsers);
    setAddModalOpen(true);
  }
  const handleAddModalClose = () => setAddModalOpen(false);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const handleEditModalOpen = async () => {
    // fetchProjectUserList()
    setEditModalOpen(true);
  }
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUsers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {

    const currentUser = localStorage.getItem("user")

    if (currentUser === "") {
      navigate("/signin");
    }
    const currentProject = localStorage.getItem("currentProject");

    if (currentProject === "") {
      alert("Please select a project")
      navigate("/home");
    }
    fetchTaskList()
  }, [])


  const statuses = [

    {
      value: "To Do",
      label: "To Do",
    },
    {
      value: "Ongoing",
      label: "Ongoing",
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

  const fetchProjectUserList = async () => {

    const projectId = localStorage.getItem("currentProject")

    const payload = {
      projectId: projectId
    }
    const response = await ProjectService.instance.getProjectUsers(payload)
    console.log(response)
    if (response.status) {
      setProjectUsers(response.userList)
    }
  }

  const fetchTaskList = async () => {
    const response = await ProjectService.instance.getTaskList()
    console.log(response)
    if (response.status) {

      const list = response.tasksList;

      for (let i = 0; i < list.length; i++) {
        list[i]['startDate'] = moment(list[i]['startDate']).utc().format('YYYY-MM-DD')
        list[i]['endDate'] = moment(list[i]['endDate']).utc().format('YYYY-MM-DD')
      }
      setData(response.tasksList)
    }
  }

  const handleAddNewTask = async () => {

    const projectId = localStorage.getItem("currentProject");

    const payload = {
      taskName: name,
      summary: summary,
      status: status,
      assigedUsers: users,
      startDate: startDate,
      endDate: endDate,
      projectId: projectId
    }
    const response = await ProjectService.instance.addTask(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setSummary('')
      setStatus('')
      setUsers([])
      setStartDate('')
      setEndDate('')

      fetchTaskList()
      handleAddModalClose()
    }
  }

  const handleEdit = async () => {

    const payload = {
      taskId: id,
      taskName: name,
      summary: summary,
      status: status,
      assigedUsers: users,
      startDate: startDate,
      endDate: endDate
    }
    const response = await ProjectService.instance.editTask(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setSummary('')
      setStatus('')
      setUsers([])
      setStartDate('')
      setEndDate('')

      fetchTaskList()
      handleEditModalClose()

    }
  }

  const handleDelete = async () => {
    const payload = {
      taskId: id
    }

    const response = await ProjectService.instance.deleteTask(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setSummary('')
      setStatus('')
      setUsers([])
      setStartDate('')
      setEndDate('')

      fetchTaskList()
      handleEditModalClose()

    }
  }

  const rowSelected = (args) => {
    const task = args.data;
    setId(task['taskId'])
    setName(task['taskName'])
    setSummary(task['summary'])
    setStatus(task['taskStatus'])
    setUsers(task['assignedUsers'])
    setStartDate(task['startDate'])
    setEndDate(task['endDate'])

    handleEditModalOpen()
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Management" title="Tasks" />
      <Button onClick={handleAddModalOpen}>Add Task</Button>
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
          <ColumnDirective field='taskId' width='100' />
          <ColumnDirective field='taskName' width='100' />
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
                    label="Task Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

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
                    form
                    id="outlined-password-input"
                    label="summary"
                    multiline
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    fullWidth={true}
                  />
                </div>
                <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Select Users</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={users}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {projectUsers.map((option) => (
                      <MenuItem key={option.userId} value={option.userEmail} >
                        <ListItemText primary={option.userName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddNewTask}>Add new task</Button>
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
                  label="Task Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  form
                  id="outlined-password-input"
                  label="summary"
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
              {/* <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Select Users</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={users}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {projectUsers.map((option) => (
                      <MenuItem key={option.userId} value={option.userId} >
                        <Checkbox checked={projectUsers.indexOf(option.userId) > -1} />
                        <ListItemText primary={option.userName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div> */}
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

export default Task;