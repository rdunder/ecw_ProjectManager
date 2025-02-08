
import { ThemeProvider, createTheme } from '@mui/material';
import ProjectTable from './Components/ProjectTable';


import './App.css'
import StatusesTable from './Components/StatusesTable';

const theme = createTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ProjectTable />
      <StatusesTable />
    </ThemeProvider>
  )
}

export default App
