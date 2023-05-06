import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Home, Team, Kanban, Calendar, Project, Task, SignInSignUp } from './pages';

import { useStateContext } from './contexts/ContexProvider';

import './App.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


const App = () => {

  const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
  const ProtectedRoutes = React.lazy(() => import('./ProtectedRoutes'))


  const [currPath, setCurrPath] = useState(window.location.pathname)

  useEffect(() => {
    setCurrPath(window.location.pathname)
  }, [])

  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>

        <Suspense fallback={loading}>
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<SignInSignUp />} />
            {/* Sign in and up */}
            <Route path="/sign-in-sign-up" element={<SignInSignUp />} />

            <Route element={< ProtectedRoutes />}>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
