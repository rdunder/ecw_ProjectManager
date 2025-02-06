
import { ThemeProvider, createTheme } from '@mui/material';
import ProjectTable from './Components/ProjectTable';


import './App.css'

const theme = createTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ProjectTable />
    </ThemeProvider>
  )
}

export default App
