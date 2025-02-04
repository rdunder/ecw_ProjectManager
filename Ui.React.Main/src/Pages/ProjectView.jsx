

import React from 'react'
import { useLocation, useNavigate} from 'react-router'
import {Link} from 'react-router-dom'
import { tryCallApiAsync } from '../Helpers/ApiCalls'

import "./projectview.css"

export const ProjectView = () => {
    const location = useLocation();
    const project = location.state?.project;
    const navigate = useNavigate();

    const baseUrl = "http://localhost:5273/api";

    const handleDelete = async () =>
    {
      try {
        const result = await tryCallApiAsync(`${baseUrl}/projects/${project.projectId}`, 'DELETE', {});
        if (result) {
          console.log("Successfully Updated Project");
          navigate("/");
        } else {
          console.log("Project was NOT Updated");
        }
      } catch (error) {
        console.error("Error updating project:", error);
      }
      navigate("/");
    }


  return (
    <>
    <main>
        <nav>
            <Link to="/" >BACK</Link>    
            <Link to="/editProject" state={{project: project}} >Edit Project</Link>
            <button onClick={handleDelete}>Delete</button>
        </nav>

        <div class="project-container">
        <h1>Project Details</h1>
        <div class="project-info">
            <p><strong>Project ID:</strong> {project.projectId} </p>
            <p><strong>Project Name:</strong> {project.projectName}</p>
            <p><strong>Description:</strong> {project.projectDescription} </p>
            <p><strong>Start Date:</strong> {project.startDate.split("T")[0]}</p>
            <p><strong>End Date:</strong> {project.endDate.split("T")[0]} </p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Service:</strong> {project.service}</p>
            <p><strong>Price:</strong> ${project.price}</p>
        </div>
        
        <div class="customer-info">
            <h2>Customer Information</h2>
            <p><strong>Company Name:</strong> {project.customer.companyName}</p>
            <p><strong>Email:</strong> {project.customer.email}</p>
            
            <h3>Contact Person:</h3>
            <p><strong>Name:</strong> {project.customer.contactPerson.firstName} {project.customer.contactPerson.lastName}</p>
            <p><strong>Email:</strong> {project.customer.contactPerson.email}</p>
            <p><strong>Phone:</strong> {project.customer.contactPerson.phoneNumber}</p>
        </div>

        <div class="manager-info">
            <h2>Project Manager Information</h2>
            <p><strong>Name:</strong> {project.projectManager.firstName} {project.projectManager.lastName}</p>
            <p><strong>Email:</strong> {project.projectManager.email}</p>
            <p><strong>Phone:</strong> {project.projectManager.phoneNumber}</p>
            <p><strong>Role:</strong> {project.projectManager.role.roleName}</p>
        </div>
    </div>
    </main>
    </>
  )
}
