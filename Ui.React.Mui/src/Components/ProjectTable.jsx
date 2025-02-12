//#region   Imports
import React, { useState, useEffect } from 'react';
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
  Box,
  useMediaQuery,
  useTheme,
  Grid2,
  tableBodyClasses
} from '@mui/material';

import {
  KeyboardArrowDown,
  KeyboardArrowRight,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ManageAccounts,
} from '@mui/icons-material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import ProjectForm from './ProjectForm';
//import { ProjectDetails } from './DropDownDetails';

import { tryCallApiAsync } from '../Helpers/ApiCalls';
import { useNavigate } from 'react-router';
//#endregion

const ProjectTable = () => {

  //#region   UseStates...
  const [projects, setProjects] = useState([]);
  const [statuses, setStatuses]   = useState([]);
  const [customers, setCustomers] = useState([]);
  const [services, setServices]   = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);  

  const [expandedRows, setExpandedRows] = useState(new Set());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newProject, setNewProject] = useState({
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

  //#region   Local Variables

  const navigate = useNavigate();

  const theme = useTheme();
  const isTabletScreen = useMediaQuery(theme.breakpoints.down("md"))
  const isDesktopScreen = useMediaQuery(theme.breakpoints.down("lg"))
  const isXlScreen = useMediaQuery(theme.breakpoints.down("xl"))
  //#endregion

  //#region   Data Fetching Functions
  useEffect(() => {
    async function fetchData() {
      try {
        const [projectResponse, statusResponse, customerResponse, serviceResponse, employeeResponse ] = 
          await Promise.all([
          tryCallApiAsync('GET', 'projects'),
          tryCallApiAsync('GET', 'statuses'),
          tryCallApiAsync('GET', 'customers'),
          tryCallApiAsync('GET', 'services'),
          tryCallApiAsync('GET', 'employees')
        ]);

        if (!projectResponse.success || 
            !statusResponse.success || 
            !customerResponse.success || 
            !serviceResponse.success || 
            !employeeResponse.success) {
          throw new Error('One or more API calls failed');
        }

        
        setProjects(projectResponse.data);
        setStatuses(statusResponse.data);
        setCustomers(customerResponse.data);
        setServices(serviceResponse.data);
        setProjectManagers(employeeResponse.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();

    }, []);

  async function fetchProjects()
  {
    const projectResponse = await tryCallApiAsync('GET', 'projects')
    if (!projectResponse.success)
      throw new Error('Fetching Projects failed');
    setProjects(projectResponse.data)
  }
//#endregion
 
  //#region   Helper functions
  const getStatusName = (statusId) => {
    return statuses.find(s => s.id === statusId)?.statusName || 'Unknown';
  };

  const getCustomerName = (customerId) => {
    return customers.find(c => c.id === customerId)?.companyName || 'Unknown';
  };

  const getServiceName = (serviceId) => {
    return services.find(s => s.id === serviceId)?.serviceName || 'Unknown';
  };

  const getProjectManagerName = (projectManagerId) => {
    const pm = projectManagers.find(pm => pm.employmentNumber === projectManagerId);
    return pm ? `${pm.firstName} ${pm.lastName}` : 'Unknown';
  };

  const getStatusColor = (statusId) => {
    switch (statusId) {

      case 1:
        return {
          bg: '#FEF3C7',
          fc: '#92400E'
        }

      case 2:
        return {
          bg: '#DBEAFE',
          fc: '#1E40AF'
        }
        
      case 3:
        return {
          bg: '#DCFCE7',
          fc: '#166534'
        }        
    }
  };

  const toggleRow = (projectId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(projectId)) {
      newExpandedRows.delete(projectId);
    } else {
      newExpandedRows.add(projectId);
    }
    setExpandedRows(newExpandedRows);
  };

//#endregion

//#region     CRUD Functions
  const handleAddProject = async () => {
    const projectToAdd = {
      ...newProject,
      startDate: newProject.startDate?.format('YYYY-MM-DDTHH:mm:ss'),
      endDate: newProject.endDate?.format('YYYY-MM-DDTHH:mm:ss')
    };

    const response = await tryCallApiAsync('POST', 'projects', null, projectToAdd);

    if (!response.success) {
      throw new Error('Failed to create project');
    }

    fetchProjects();
    setOpenAddDialog(false);
    setNewProject({
      projectName: "",
      projectDescription: "",
      startDate: null,
      endDate: null,
      statusId: 1,
      customerId: 1,
      serviceId: 1,
      projectManagerId: 101
    });
  };

  const handleDeleteProject = async (projectId) => {
    const response = await tryCallApiAsync('DELETE', 'projects', projectId)

    if (!response.success)
      throw new Error("Failed to delete Project")

    fetchProjects();
  };

  const handleEditProject = (project) => {

    console.log(project.projectId)
    navigate('/projectxp', { state: { projectId: project.projectId }})

    // setEditingProject({
    //   ...project,
    //   startDate: dayjs(project.startDate),
    //   endDate: dayjs(project.endDate),
    // });
    // setOpenEditDialog(true);
  };

  const handleUpdateProject = async () => {
    const updatedProject = {
      ...editingProject,
      startDate: editingProject.startDate.format('YYYY-MM-DDTHH:mm:ss'),
      endDate: editingProject.endDate.format('YYYY-MM-DDTHH:mm:ss')
    };

    const response = await tryCallApiAsync('PUT', 'projects', editingProject.projectId, updatedProject);

    if (!response.success) {
      throw new Error('Failed to create project');
    }

    fetchProjects();
    setOpenEditDialog(false);
    setEditingProject(null);
  };
  //#endregion

  const ProjectDetails = ({ project }) => (
    <Box sx={{ p: 3 }}>
      
      <Grid2 container columnSpacing={3} rowSpacing={5}>
        
        <Grid2 size={12}>
          <Box p={3} borderRadius={2} boxShadow={`0px 0px 5px 0px ${getStatusColor(project.statusId).fc}`} >
            <Typography variant="h6" gutterBottom>ID: {project.projectId}</Typography>
            
            <Typography><strong>Description:</strong></Typography>
            <Typography>{project.projectDescription}</Typography>

            <Divider sx={{marginTop: '15px'}}></Divider>
            <Typography><strong>Time Frame:</strong></Typography>
            <Typography gutterBottom>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</Typography>
            
            <Divider sx={{marginTop: '15px'}}></Divider>
            <Typography><strong>Service:</strong> </Typography>
            <Typography>{getServiceName(project.serviceId)}</Typography>
            <Typography>$ {services.find(s => s.id === project.serviceId).price}</Typography>
          </Box>
        </Grid2>
        
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Typography><strong>Customer</strong></Typography>
          <Typography>{getCustomerName(project.customerId)}</Typography>
          <Typography>{customers.find(c => c.id === project.customerId).email}</Typography>          
        </Grid2>
        
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Typography><strong>Contact Person</strong></Typography>
          <Typography>{customers.find(c => c.id === project.customerId).contactPerson.firstName} {customers.find(c => c.id === project.customerId).contactPerson.lastName}</Typography>
          <Typography>{customers.find(c => c.id === project.customerId).contactPerson.email}</Typography>
          <Typography>{customers.find(c => c.id === project.customerId).contactPerson.phoneNumber}</Typography>
        </Grid2>
        
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Typography><strong>Project Manager:</strong></Typography>
          <Typography>{getProjectManagerName(project.projectManagerId)} ({projectManagers.find(pm => pm.employmentNumber === project.projectManagerId).role.roleName})</Typography>
          <Typography>{projectManagers.find(pm => pm.employmentNumber === project.projectManagerId).email}</Typography>
          <Typography>{projectManagers.find(pm => pm.employmentNumber === project.projectManagerId).phoneNumber}</Typography>
        </Grid2>
      </Grid2>      
    </Box>
  );
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Projects</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Project
          </Button>
          <Button
            variant="contained"
            startIcon={<ManageAccounts />}
            onClick={() => navigate('/projectxp')}
          >
            Admin Panel
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>Name</TableCell>
                <TableCell align='center'>Status</TableCell>
                {!isTabletScreen && <TableCell>Start Date</TableCell>}
                {!isTabletScreen && <TableCell>End Date</TableCell>}
                {!isDesktopScreen && <TableCell>Service</TableCell>}
                {!isDesktopScreen && <TableCell>Customer</TableCell>}
                {!isXlScreen && <TableCell>Manager</TableCell>}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <React.Fragment key={project.projectId}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <IconButton size="small" onClick={() => toggleRow(project.projectId)}>
                        {expandedRows.has(project.projectId) ? 
                          <KeyboardArrowDown /> : 
                          <KeyboardArrowRight />
                        }
                      </IconButton>
                    </TableCell>
                    <TableCell>{project.projectName}</TableCell>
                    <TableCell> 
                      <Box sx={{ padding: 1, borderRadius: 50, textAlign: 'center', backgroundColor: getStatusColor(project.statusId).bg}}>
                        <Typography fontSize={13} color={getStatusColor(project.statusId).fc}>{getStatusName(project.statusId)}</Typography>
                      </Box>
                    </TableCell>
                    {!isTabletScreen && <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>}
                    {!isTabletScreen && <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>}
                    {!isDesktopScreen && <TableCell>{getServiceName(project.serviceId)}</TableCell>}
                    {!isDesktopScreen && <TableCell>{getCustomerName(project.customerId)}</TableCell>}
                    {!isXlScreen && <TableCell>{getProjectManagerName(project.projectManagerId)}</TableCell>}
                    <TableCell align="right">               
                      <IconButton onClick={() => handleEditProject(project)} color="primary">                   
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProject(project.projectId)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expandedRows.has(project.projectId)}>
                        <ProjectDetails project={project} />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogContent>
            <ProjectForm 
              data={newProject} 
              setData={setNewProject}
              statuses={statuses}
              customers={customers}
              services={services}
              projectManagers={projectManagers}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddProject} variant="contained">Add Project</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogContent>
            {editingProject && (
              <ProjectForm 
                data={editingProject} 
                setData={setEditingProject}
                statuses={statuses}
                customers={customers}
                services={services}
                projectManagers={projectManagers}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateProject} variant="contained">Update Project</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default ProjectTable;