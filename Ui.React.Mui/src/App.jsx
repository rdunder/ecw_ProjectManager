import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import ProjectTable from './Components/ProjectTable';
import ProjectFormPage from './Pages/Experimental/ProjectFormPage';


import './App.css'
import StatusesTable from './Components/StatusesTable';
import { Route, Routes } from 'react-router';
import Index from './Pages/Index';
import AdminPage from './Pages/AdminPage';

import { CookiesProvider, useCookies } from 'react-cookie';
import Login from './Components/Login';

const theme = createTheme();

function App() {

    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'tokenExpiration', 'tokenType']);
  

  return (
    <ThemeProvider theme={theme}>
    <CookiesProvider>
      <Login setCookies={setCookies} />
      <Routes>        
        <Route path='/' element={<Index />} />
        <Route path='/admin' element={<AdminPage cookies={cookies}/>} />
        <Route path='/projectxp' element={<ProjectFormPage />} />
      </Routes>
    </CookiesProvider>
    </ThemeProvider>
  )
}

export default App
