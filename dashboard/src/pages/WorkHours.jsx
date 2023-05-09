import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const WorkHours = () => {
  const navigate = useNavigate()

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [workHours, setWorkHours] = useState([]);

  const calculateTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
  }

  const handleStop = () => {
    const currentWorkHour = "Your last work hour is: " + calculateTime(time);
    setWorkHours(prevWorkHours => [...prevWorkHours, currentWorkHour]);
    setTime(0);
    setRunning(false);
  }

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
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className='text-xl text-center'>List your work hours here using this Stopwatch:</h1>

      <div className='flex-1 flex items-center justify-center flex-col'>
        <div className="timer-wrapper flex items-center justify-center mt-4" style={{ fontSize: '4rem' }}>
          <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </div>

        <div className="flex items-center justify-center mt-4">
          {running ? (
            <Button onClick={() => { setRunning(false) }}> Pause </Button>
          ) :
            (
              <Button onClick={() => { setRunning(true) }}> Start </Button>
            )}
          <Button onClick={handleStop}> Stop </Button>
          <Button onClick={() => { setTime(0) }}> Reset </Button>
        </div>
        <p>List from the last 24 hours:</p>
        <ul>
          {workHours.map((workHour, index) => (
            <li key={index}>{workHour}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default WorkHours;
