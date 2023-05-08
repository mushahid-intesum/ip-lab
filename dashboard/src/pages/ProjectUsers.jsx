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

const ProjectUsers = () => {

  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const [allUserData, setAllUserData] = useState([])

  let grid;

  useEffect(() => {;
    fetchAllUserList()
  }, [])

  const settings = {
    enableSimpleMultiRowSelection: true,
    type: 'Multiple'
};

  const handleAddUsersToProject = async () => {
    const projectId = localStorage.getItem('currentProject');
    const payload = 
    {
      userList: grid.getSelectedRecords(),
      projectId: projectId
    }
    const response = await ProjectService.instance.addUsersToProject(payload);
    if(response.status)
    {
      navigate('/team')
    }
  }

  const fetchAllUserList = async () => {
    const projectId = localStorage.getItem('currentProject');
    const user = JSON.parse(localStorage.getItem("user"))

    const payload = 
    {
      projectId: projectId,
      userId: user.userId
    }
    const response = await UserService.instance.getUsersNotInProjectList(payload)
    console.log(response)
    if (response.status) {
      setAllUserData(response.userList)
    }
  }


  const rowSelected = () => {
    const selectedrowindex = grid.getSelectedRowIndexes();
    /** Get the selected records. */
    const selectedrecords = grid.getSelectedRecords();
    console.log(selectedrecords)
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Management" title="User" />
      <Button onClick={handleAddUsersToProject}>Add Users to Project</Button>
      <GridComponent
        dataSource={allUserData}
        allowPaging
        allowSorting
        editSettings={{ allowDeleting: false, allowEditing: false, allowAdding: false }}
        width="auto"
        allowFiltering
        rowSelected={rowSelected}
        selectionSettings={settings}
        ref={g => grid = g}
      >
        <ColumnsDirective>
          <ColumnDirective type='checkbox' width='60'></ColumnDirective>
          <ColumnDirective field='userId' width='100' />
          <ColumnDirective field='userName' width='100' />
          <ColumnDirective field='userEmail' width='100' />

        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Edit, Sort, CommandColumn, Filter]} />
      </GridComponent>
    </div>
  )
}

export default ProjectUsers;
