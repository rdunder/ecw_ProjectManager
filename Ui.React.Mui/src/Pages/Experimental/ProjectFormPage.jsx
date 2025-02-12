
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

    const [statusFormCollapse, setStatusFormCollapse] = useState(false);
    const [serviceFormCollapse, setServiceFormCollapse] = useState(false);
    const [customerFormCollapse, setCustomerFormCollapse] = useState(false);
    const [projectManagerFormCollapse, setProjectManagerFormCollapse] = useState(false);
    
    const [statuses,    setStatuses]    = useState([]);
    const [customers,   setCustomers]   = useState([]);
    const [services,    setServices]    = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);
    const [roles, setRoles] = useState([])

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

    const [newStatus, setNewStatus] = useState({
      statusName: ""
    });
    const [newService, setNewService] = useState({
      serviceName: "",
      price: 0
    })
    const [newCustomer, setNewCustomer] = useState({
      companyName: "",
      email: ""
    })
    const [newEmployee, setNewEmployee] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      roleId: 1
    })
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
        fetchRoles();
    }, [])

    async function fetchStatuses() {
      const res = await tryCallApiAsync("GET", "statuses")
      
      if (!res.success) {
        throw new Error("Statuses failed to load")
      }

      setStatuses(res.data)
    }

    async function fetchServices() {
      const res = await tryCallApiAsync("GET", "services")

      if (!res.success) {
        throw new Error("Services failed to load")
      }

      setServices(res.data)
    }

    async function fetchCustomers() {
      const res = await tryCallApiAsync("GET", "customers")

      if (!res.success) {
        throw new Error("customers failed to load")
      }

      setCustomers(res.data)
    }

    async function fetchEmployees() {
      const res = await tryCallApiAsync("GET", "employees")

      if (!res.success) {
        throw new Error("empoyees failed to load")
      }

      setProjectManagers(res.data)
    }

    async function fetchRoles() {
      const res = await tryCallApiAsync("GET", "roles")

      if (!res.success) {
        throw new Error("roles failed to load")
      }

      setRoles(res.data)
    }
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

  async function handleSaveStatus() {
    const res = await tryCallApiAsync("POST", "statuses", null, newStatus)

    if (!res.success) {
      throw new Error("Failed to add new status")
    }

    fetchStatuses()
    setStatusFormCollapse(false)
    setNewStatus({
      statusName: ""
    })
  }

  async function handleSaveService() {
    const res = await tryCallApiAsync("POST", "services", null, newService)

    if (!res.success) {
      throw new Error("Failed to add new service")
    }

    fetchServices()
    setServiceFormCollapse(false)
    setNewService({
      serviceName: "",
      price: 1
    })
  }

  async function handleSaveCustomer() {
    const res = await tryCallApiAsync("POST", "customers", null, newCustomer)

    if (!res.success) {
      throw new Error("Failed to add new customer")
    }

    fetchCustomers()
    setCustomerFormCollapse(false)
    setNewCustomer({
      companyNameName: "",
      email: ""
    })
  }

  async function handleSaveEmployee() {
    const res = await tryCallApiAsync("POST", "employees", null, newEmployee)

    if (!res.success) {
      throw new Error("Failed to add new employee (Project Manager)")
    }

    fetchEmployees()
    setProjectManagerFormCollapse(false)
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      roleId: 1
    })
  }
//#endregion

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h1>Add / Edit Project</h1>
      
      
      <Box
        component="main"
        bgcolor={'white'}
        maxWidth={1200}
        sx={{ 
          p: 5, 
          display: 'flex',
          flexDirection: 'column',
          gap: 5, 
          flexWrap: 'wrap', 
          justifyContent: 'center' }}>
      
      <Box
        component="section"
        sx={{ 
            pt: 2, 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
            flexGrow: 1 }} >
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

        <Box sx={{display: 'flex', gap: 2}}>
        <DatePicker
          sx={{flexGrow: 1}}
          label="Start Date"
          value={project.startDate}
          onChange={(newDate) => setProject({ ...project, startDate: newDate })}
        />
        <DatePicker
          sx={{flexGrow: 1}}
          label="End Date"
          value={project.endDate}
          onChange={(newDate) => setProject({ ...project, endDate: newDate })}
        />
        </Box>
      </Box>

      <Box
        component="section" 
        sx={{ 
            pt: 2, 
            display: 'flex', 
            gap: 2,
            flexGrow: 1,
            flexWrap: 'wrap' }}>
        
        {/* Status Select */}
        <Box sx={{flexGrow: 1, mb: 3}}>         

          <FormControl fullWidth >
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

          <IconButton onClick={() => setStatusFormCollapse(!statusFormCollapse)} color='success' size='small' >
            <AddIcon fontSize='inherit' />
            Add Status
          </IconButton>

          <Collapse in={statusFormCollapse}>
            <Box sx={{ mt: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid rgba(0, 0, 0, 0.07)' }}>
                <TextField
                    label="Status Name"
                    fullWidth
                    value={newStatus.statusName || ""}
                    onChange={(e) => setNewStatus({ ...newStatus, statusName: e.target.value})}
                />
                <Button onClick={handleSaveStatus} variant='contained'>
                  Save
                </Button>
            </Box>
          </Collapse>
          
        </Box>
        
        {/* Service Select */}
        <Box sx={{flexGrow: 1, mb: 3}}>        

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

        <IconButton onClick={() => setServiceFormCollapse(!serviceFormCollapse)} color='success' size='small' >
            <AddIcon fontSize='inherit' />
            Add Service
        </IconButton>

        <Collapse in={serviceFormCollapse}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid rgba(0, 0, 0, 0.07)' }}>
                <TextField
                    label="Service Name"
                    fullWidth
                    value={newService.serviceName || ""}
                    onChange={(e) => setNewService({ ...newService, serviceName: e.target.value})}
                />
                <TextField
                    label="Price"
                    fullWidth
                    value={newService.price || ""}
                    onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value)})}
                />
                <Button onClick={handleSaveService} variant='contained'>
                  Save
                </Button>
            </Box>
          </Collapse>
        </Box>        
        
        {/* Customer select */}
        <Box sx={{flexGrow: 1, mb: 3}}>        

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

        <IconButton onClick={() => setCustomerFormCollapse(!customerFormCollapse)} color='success' size='small' >
            <AddIcon fontSize='inherit' />
            Add Customer
        </IconButton>
        
        <Collapse in={customerFormCollapse}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid rgba(0, 0, 0, 0.07)' }}>
                <TextField
                    label="Company Name"
                    fullWidth
                    value={newCustomer.companyName || ""}
                    onChange={(e) => setNewCustomer({ ...newCustomer, companyName: e.target.value})}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={newCustomer.email || ""}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value})}
                />
                <Button onClick={handleSaveCustomer} variant='contained'>
                  Save
                </Button>
            </Box>
          </Collapse>
        </Box>
        
        
        {/* ProjectManager Select */}
        <Box sx={{flexGrow: 1, mb: 3}}>        

        <FormControl fullWidth>
          <InputLabel>Project Manager</InputLabel>
          <Select
            value={project.projectManagerId}
            label="Project Manager"
            onChange={(e) => setProject({ ...project, projectManagerId: parseInt(e.target.value, 10) })}
          >
            {projectManagers.map(pm => (
              <MenuItem key={pm.employmentNumber} value={pm.employmentNumber}>
                {`${pm.firstName} ${pm.lastName} (${pm.role.roleName})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton onClick={() => setProjectManagerFormCollapse(!projectManagerFormCollapse)} color='success' size='small' >
            <AddIcon fontSize='inherit' />
            Add Project Manager
        </IconButton>

        <Collapse in={projectManagerFormCollapse}>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="First Name"
                    fullWidth
                    value={newEmployee.firstName || ""}
                    onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value})}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    value={newEmployee.lastName || ""}
                    onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value})}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={newEmployee.email || ""}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value})}
                />
                <TextField
                    label="Phone Number"
                    fullWidth
                    value={newEmployee.phoneNumber || ""}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phoneNumber: e.target.value})}
                />

                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={newEmployee.roleId}
                    label="Role"
                    onChange={(e) => setNewEmployee({ ...newEmployee, roleId: e.target.value })}
                  >
                    {roles.map(role => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button onClick={handleSaveEmployee} variant='contained'>
                  Save
                </Button>
            </Box>
          </Collapse>
        </Box>
        
      </Box>

      </Box>

      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center',  gap: 2 }}>
          <Button color='warning' onClick={() => navigate("/")}>Cancel</Button>
          <Button onClick={handleSaveProject} variant="contained">Save Project</Button>
      </Box>
        
    </LocalizationProvider>
  )
}
