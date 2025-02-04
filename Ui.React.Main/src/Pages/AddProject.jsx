import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router'
import { tryCallApiAsync } from '../Helpers/ApiCalls'

import "./addProject.css"

export const AddProject = () => {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:5273/api";

    const [statuses, setStatuses]   = useState([]);
    const [customers, setCustomers] = useState([]);
    const [services, setServices]   = useState([]);
    const [employees, setEmployees] = useState([]);

    const [projectName, setProjectName]               = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [startDate, setStartDate]                   = useState("");
    const [endDate, setEndDate]                       = useState("");
    const [statusId, setStatusId]                     = useState(0);
    const [customerId, setCustomerId]                 = useState(0);
    const [serviceId, setServiceId]                   = useState(0);
    const [projectMangerId, setProjectManagerId]      = useState(0);


    const example = ["a", "b", "c"]

    const submit = async (e) =>
    {
        e.preventDefault();

        let formData = {
          "projectName": projectName,
          "projectDescription": projectDescription,
          "startDate": startDate,
          "endDate": endDate,
          "statusId": parseInt(statusId),
          "customerId": parseInt(customerId),
          "serviceId": parseInt(serviceId),
          "projectManagerId": parseInt(projectMangerId)
        }
        
        try {
          const result = await tryCallApiAsync(`${baseUrl}/projects`, 'POST', formData);
          if (result) {
            console.log("Successfully Added Project");
            navigate("/");
          } else {
            console.log("Project was NOT Added");
          }
        } catch (error) {
          console.error("Error Adding project:", error);
        }

        navigate("/")
    }

    const handleCancelClick = () =>
    {
      navigate("/")
    }

    useEffect( () => {

      fetch(`${baseUrl}/statuses`)
        .then( res => {return res.json();})
        .then( data => {data.success == true ? setStatuses(data.data) : setStatuses([])});

      fetch(`${baseUrl}/customers`)
        .then( res => {return res.json();})
        .then( data => {data.success == true ? setCustomers(data.data) : setCustomers([])});

      fetch(`${baseUrl}/services`)
        .then( res => {return res.json();})
        .then( data => {data.success == true ? setServices(data.data) : setServices([])});

      fetch(`${baseUrl}/employees`)
        .then( res => {return res.json();})
        .then( data => {data.success == true ? setEmployees(data.data) : setEmployees([])});

    }, [])

  return (
    <>
    <main>        
        <form onSubmit={submit}>

          <div className='input-group'>
            <label>Project Name</label>
            <input type='text' name='projectName' onChange={event => setProjectName(event.target.value)} />
          </div>

          <div className='input-group'>
            <label>Project Description</label>
            <input type='text-area' name='projectDescription' onChange={event => setProjectDescription(event.target.value)} />
          </div>

          <div className='input-group'>
            <label>Start Date</label>
            <input type='date' name='startDate' onChange={event => setStartDate(event.target.value)} />
          </div>

          <div className='input-group'>
            <label>End Date</label>
            <input type='date' name='endDate' onChange={event => setEndDate(event.target.value)} />
          </div>

          <div className='input-group'>
            <label>Status</label>
            <select onChange={event => setStatusId(event.target.value)}>
              <option>...</option>
              {
                statuses.map( status =>
                  <option key={status.id} value={status.id}>{status.statusName}</option>
                )
              }
            </select>
          </div>

          <div className='input-group'>
            <label>Customer</label>
            <select onChange={event => setCustomerId(event.target.value)}>
              <option>...</option>
              {
                customers.map( customer =>
                  <option key={customer.id} value={customer.id}>{customer.companyName}</option>
                )
              }
            </select>
          </div>

          <div className='input-group'>
            <label>Service</label>
            <select onChange={event => setServiceId(event.target.value)}>
              <option>...</option>
              {
                services.map( service =>
                  <option key={service.id} value={service.id}>{service.serviceName} ${service.price}</option>
                )
              }
            </select>
          </div>

          <div className='input-group'>
            <label>Project Manager</label>
            <select onChange={event => setProjectManagerId(event.target.value)}>
              <option>...</option>
              {
                employees.map( employee =>
                  <option key={employee.employmentNumber} value={employee.employmentNumber}>
                    {employee.firstName} {employee.lastName} ({employee.role.roleName})
                  </option>
                )
              }
            </select>
          </div>
          
          <div className='submit-group'>
            <button className='btnSave' type='submit'>Save</button>
            <button className='btnCancel' type='button' onClick={handleCancelClick}>cancel</button>
          </div>          
        </form>
    </main>
    </>
  )
}
