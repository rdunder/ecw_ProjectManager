// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Index } from './Pages/Index'
import { ProjectView } from './Pages/ProjectView'
import { AddProject } from './Pages/AddProject'
import { EditProject } from './Pages/EditProject'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Index />} />
        <Route path='/projectview' element={<ProjectView />} />
        <Route path='/addproject' element={<AddProject />} />
        <Route path='/editproject' element={<EditProject/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
