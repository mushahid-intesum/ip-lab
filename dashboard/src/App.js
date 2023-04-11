import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {Navbar, Footer, Sidebar, ThemeSettings} from './components';
import {Home, Team, Kanban, Calendar, Project, Task, SignInSignUp} from './pages';

import { useStateContext } from './contexts/ContexProvider';


import './App.css'

const App = () => {

  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative  dark:bg-main-dark-bg">

          {/* Settings */}
          <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
            <TooltipComponent content="Settings" position="Top">
              <button type="button" 
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white" 
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%'}}>
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Sidebar */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white" >
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          {/* Navbar */}
          <div
            className={
              `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
              ${activeMenu
                ? 'md:ml-72'
                : 'flex-2'}`
            }>
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar/>
            </div>
          
          <div>
            {themeSettings && <ThemeSettings />}

            <Routes>
              

              <Route path="/home" element={<Home />} />
              
              {/* Pages */}
              <Route path="/team" element={<Team />} />

              {/* <Route path="/projects" element={<Project/>} /> */}
              <Route path="/tasks" element={<Task/>} />
              
              {/* Apps */}
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/calendar" element={<Calendar />} />


              {/* Dashboard */}
              <Route path="/" element={<SignInSignUp />} />
              {/* Sign in and up */}
              <Route path="/sign-in-sign-up" element={<SignInSignUp />} />

            </Routes>
          </div>
        </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App