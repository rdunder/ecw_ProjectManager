import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import ProjectTable from './Components/ProjectTable';
import ProjectFormPage from './Pages/Experimental/ProjectFormPage';


import './App.css'
import StatusesTable from './Components/StatusesTable';
import { Route, Routes } from 'react-router';
import Index from './Pages/Index';
import AdminPage from './Pages/AdminPage';

const theme = createTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/projectxp' element={<ProjectFormPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
