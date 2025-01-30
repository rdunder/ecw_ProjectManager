import React, { useEffect, useState } from 'react'
import './index.css'

export const Index = () => {

    const [projects, setProjects] = useState([]);

    useEffect( () =>
    {
        fetch("https://localhost:7247/api/projects")
        .then( res => {
            return res.json();
        })
        .then( data => {
            data.success == true 
                ? setProjects(data.data)
                : setProjects([])
        })
    }, [])


  return (
    <>
        <h1>Current Projects</h1>
        
        {projects.length > 0 
            ? projects.map(project => (
                <div key={project.projectId} className='projectContainer'>
                    <div className='title'>
                        <h3>{project.projectName}</h3>
                        <p>{project.projectDescription}</p>
                    </div>
                    <div className='information'>
                        <p>Service: {project.service.serviceName}</p>
                        <p>Start Date: {project.startDate}</p>
                        <p>End Date: {project.endDate}</p>
                        <p>Customer: {project.customer.companyName}</p>
                        <p>Manager: {project.projectManager.firstName} {project.projectManager.lastName}</p>
                    </div>
                </div>
            )) 
            : <p>Loading ....</p>}
    </>
  )
}
