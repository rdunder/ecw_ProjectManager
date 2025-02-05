import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router"
import {Link} from 'react-router-dom'


import './index.css'
import ProjectTable from '../Components/ProjectTable'

export const Index = () => {

    const [projects, setProjects] = useState([]);
    let navigate = useNavigate();

    useEffect( () =>
    {
        fetch("http://localhost:5273/api/projects/details")
        .then( res => {
            return res.json();
        })
        .then( data => {
            data.success == true 
                ? setProjects(data.data)
                : setProjects([])
        })
    }, [])

    const handleButtonClick = () => {
        Navigate("/addproject")
    }
    

  return (
    <>        
        <main>
            <header>
                <h1>Project Manager</h1>
                <button onClick={ () => navigate("/addproject")}>Add Project</button>                
            </header>
            <section>

            {projects.length > 0 
            ? projects.map(project => (
                <div key={project.projectId}   className='projectContainer'>
                    <div className='title'>
                        <Link to="/projectview" state={{project: project}} ><h2>{project.projectName}</h2> </Link>
                        <div className='project-information'>
                        <p>Status: {project.status}</p>
                        <p>Time Frame: {project.startDate.split("T")[0]} - {project.endDate.split("T")[0]}</p>
                        <p>P.M: {project.projectManager.firstName} {project.projectManager.lastName}</p>
                        </div>                        
                    </div>                    
                </div>
            )) 
            : <p>Loading ....</p>}

            </section>

        </main>
    </>
  )
}
