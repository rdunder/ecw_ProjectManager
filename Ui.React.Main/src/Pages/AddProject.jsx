import React from 'react'
import { useLocation} from 'react-router'
import {Link} from 'react-router-dom'

import "./projectview.css"

export const AddProject = () => {
    const location = useLocation();
    const project = location.state?.project;


  return (
    <>
    <main>
        <nav>
            <Link to="/" >BACK</Link>    
            <Link to="editproject">Edit Project</Link>
        </nav>

        <h2>{project.projectName}</h2>
        <strong>{project.projectDescription}</strong>
    </main>
    </>
  )
}
