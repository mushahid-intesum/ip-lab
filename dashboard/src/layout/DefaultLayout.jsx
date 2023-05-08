import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings, UserProfile } from '../components';
import { Home, Team, Kanban, Calendar, ProjectUsers, Task, SignIn, SignUp, GitReport, WorkHours} from '../pages';

import { useStateContext } from '../contexts/ContexProvider';
import { useNavigate } from 'react-router-dom'


import './App.css'

const DefaultLayout = () => {
  const navigate = useNavigate()

  const [currPath, setCurrPath] = useState(window.location.pathname)

  useEffect(() => {
    setCurrPath(window.location.pathname)
  }, [])

  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative  dark:bg-main-dark-bg">

          {/* Settings */}
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}>
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {currPath !== '/' && <>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white" >
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
          </>
          }

          {/* Navbar */}
          <div
            className={
              `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
              ${activeMenu
                ? 'md:ml-72'
                : 'flex-2'}`
            }>
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>


            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>

                <Route path="/home" element={<Home />} />

                {/* Pages */}
                <Route path="/team" element={<Team />} />

                <Route path="/project_users" element={<ProjectUsers/>} />
                <Route path="/tasks" element={<Task />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} /> 
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/gitreport" element={<GitReport />} />
                <Route path="/workhours" element={<WorkHours />} />
              </Routes>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DefaultLayout