import React from 'react';
import { useEffect, useState } from 'react'

import moment from 'moment';


import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';

import UserService from '../services/UserService'
import ProjectService from '../services/ProjectService'

import { useNavigate } from 'react-router-dom'


const Kanban = () => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [data, setData] = useState([])

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
    fetchTaskList()
  }, [])


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

  const handleEdit = async (payload) => {

    const response = await ProjectService.instance.editTask(payload)
    console.log(response)
    if (response.status) {
      fetchTaskList()

    }
  }

  const onActionComplete = (args) => {
    const payload = args.changedRecords[0];
    handleEdit(payload)
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      < Header category="App" title="Kanban" />
      <KanbanComponent
        id="kanban"
        dataSource={data}
        cardSettings={{ contentField: "summary", headerField: "taskName" }}
        keyField="status"
        actionComplete={onActionComplete}
      >
        <ColumnsDirective>
          <ColumnDirective headerText="To Do" keyField="To Do" />
          <ColumnDirective headerText="Ongoing" keyField="Ongoing" />
          <ColumnDirective headerText="Testing" keyField="Testing" />
          <ColumnDirective headerText="Done" keyField="Done" />

        </ColumnsDirective>
      </KanbanComponent>
    </div>
  )
}

export default Kanban