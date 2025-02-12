
//#region   Imports
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Collapse,
    Typography,
    useMediaQuery,
    useTheme,
    Grid2,
    tableBodyClasses,
    TextField,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
  } from '@mui/material';
  
  import {
    KeyboardArrowDown,
    KeyboardArrowRight,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    ManageAccounts,
  } from '@mui/icons-material';

  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import dayjs from 'dayjs';


import { tryCallApiAsync } from '../../Helpers/ApiCalls';

//#endregion



export default function ProjectFormPage() {
    
//#region   States
    const location = useLocation();
    const navigate = useNavigate();
    const projectId = location.state?.projectId ?? null;

    
    const [statuses,    setStatuses]    = useState([]);
    const [customers,   setCustomers]   = useState([]);
    const [services,    setServices]    = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);

    const [project,     setProject]     = useState({
        projectName: "",
        projectDescription: "",
        startDate: null,
        endDate: null,
        statusId: 1,
        customerId: 1,
        serviceId: 1,
        projectManagerId: 101
      });
//#endregion

//#region   Fetch Data
    useEffect( () => {

        async function fetchData() {
            try {
                const [statusResponse, customerResponse, serviceResponse, employeeResponse ] = 
                await Promise.all([              
                tryCallApiAsync('GET', 'statuses'),
                tryCallApiAsync('GET', 'customers'),
                tryCallApiAsync('GET', 'services'),
                tryCallApiAsync('GET', 'employees')
                ]);                    
        
                if (!statusResponse.success || 
                    !customerResponse.success || 
                    !serviceResponse.success || 
                    !employeeResponse.success) {
                throw new Error('One or more API calls failed');
                }            
                
                setStatuses(statusResponse.data);
                setCustomers(customerResponse.data);
                setServices(serviceResponse.data);
                setProjectManagers(employeeResponse.data);

                if (projectId != null) {
                    const projectResponse = await tryCallApiAsync('GET', 'projects', projectId)

                    if (!projectResponse.success) {
                        throw new Error('Project API Call failed')
                    }
                    const projectData = projectResponse.data;
                    setProject({
                      ...projectData,
                      startDate: projectData.startDate ? dayjs(projectData.startDate) : null,
                      endDate: projectData.endDate ? dayjs(projectData.endDate) : null
                    });
                }    
                
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }

        fetchData();
    }, [])

//#endregion

//#region   Fuctions
async function handleSaveProject() {

  const newProject = {
    ...project,
    startDate: project.startDate?.format('YYYY-MM-DDTHH:mm:ss'),
    endDate: project.endDate?.format('YYYY-MM-DDTHH:mm:ss')
  }

  let response;
  if (projectId != null) {
    //  Update Project
    response = await tryCallApiAsync('PUT', 'projects', projectId, newProject);
  } else {
    //  Add New Project
    response = await tryCallApiAsync('POST', 'projects', null, newProject);
  }

  if (!response.success) {
    throw new Error('Failed to create project');
  }

  navigate("/");
}
//#endregion

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h1>Add / Edit Project</h1>
        
      <Box sx={{ pt: 2, display: 'flex', gap: 5 }}>

      <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Project Name"
          fullWidth
          value={project.projectName || ''}
          onChange={(e) => setProject({ ...project, projectName: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={project.projectDescription || ''}
          onChange={(e) => setProject({ ...project, projectDescription: e.target.value })}
        />
        <DatePicker
          label="Start Date"
          value={project.startDate}
          onChange={(newDate) => setProject({ ...project, startDate: newDate })}
        />
        <DatePicker
          label="End Date"
          value={project.endDate}
          onChange={(newDate) => setProject({ ...project, endDate: newDate })}
        />
      </Box>

      <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={project.statusId}
            label="Status"
            onChange={(e) => setProject({ ...project, statusId: parseInt(e.target.value, 10) })}
          >
            {statuses.map(status => (
              <MenuItem key={status.id} value={status.id}>
                {status.statusName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Customer</InputLabel>
          <Select
            value={project.customerId}
            label="Customer"
            onChange={(e) => setProject({ ...project, customerId: parseInt(e.target.value, 10) })}
          >
            {customers.map(customer => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.companyName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Service</InputLabel>
          <Select
            value={project.serviceId}
            label="Service"
            onChange={(e) => setProject({ ...project, serviceId: parseInt(e.target.value, 10) })}
          >
            {services.map(service => (
              <MenuItem key={service.id} value={service.id}>
                {service.serviceName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Project Manager</InputLabel>
          <Select
            value={project.projectManagerId}
            label="Project Manager"
            onChange={(e) => setProject({ ...project, projectManagerId: parseInt(e.target.value, 10) })}
          >
            {projectManagers.map(pm => (
              <MenuItem key={pm.employmentNumber} value={pm.employmentNumber}>
                {`${pm.firstName} ${pm.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
      </Box>

      </Box>

      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center',  gap: 2 }}>
          <Button onClick={() => navigate("/")}>Cancel</Button>
          <Button onClick={handleSaveProject} variant="contained">Save Project</Button>
      </Box>
        
    </LocalizationProvider>
  )
}
