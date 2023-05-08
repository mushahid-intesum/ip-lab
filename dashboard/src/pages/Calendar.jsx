import React from 'react'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop} from '@syncfusion/ej2-react-schedule';
import {scheduleData} from '../data/dummy';
import {Header} from '../components';
import { useEffect, useState } from 'react'
import UserService from '../services/UserService'


const Calendar = () => {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [data, setData] = useState([])

  useEffect(() => {
    fetchTaskList()
  }, [])


  const statuses = [
    {
      value: 'In Progress',
      label: 'in progress',
    },
    {
      value: 'To do',
      label: 'to do',
    },
    {
      value: 'Done',
      label: 'done',
    },

    {
      value: 'Testing',
      label: 'testing',
    },
  ];

  const fetchTaskList = async () => {
    const response = await UserService.instance.getTaskList()
    console.log(response)
    if (response.status) {

      const list = response.tasksList;

      for (let i = 0; i < list.length; i++) {
        list[i]['Subject'] = list[i]['summary']
        list[i]['StartTime'] = list[i]['startDate']
        list[i]['EndTime'] = list[i]['endDate']
      }

      console.log(list)
      setData(list)
    }
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      < Header category="App" title="Calendar"/>

      <ScheduleComponent 
        height="650px"
        eventSettings={{ dataSource: data }}
        selectedDate={ new Date() }  
        currentView="Day"
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>

    </div>
  )
}

export default Calendar
