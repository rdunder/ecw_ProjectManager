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

import ProjectForm from '../ProjectForm';
//import { ProjectDetails } from './DropDownDetails';

import { tryCallApiAsync } from '../../Helpers/ApiCalls';
import { useNavigate } from 'react-router';
//#endregion

const ProjectTable = () => {

  //#region   UseStates...
  const [projects, setProjects] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());
  
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
        await fetchProjects()        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
    }, []);

  async function fetchProjects()
  {
    const res = await tryCallApiAsync('GET', 'projects/details')
    if (!res.success)
      throw new Error('Fetching Projects failed');
    setProjects(res.data)
  }
//#endregion
 
  //#region   Helper functions
  const getStatusColor = (status) => {
    switch (status) {

      case 'Pending':
        return {
          bg: '#FEF3C7',
          fc: '#92400E'
        }

      case 'Active':
        return {
          bg: '#DBEAFE',
          fc: '#1E40AF'
        }
        
      case 'Closed':
        return {
          bg: '#DCFCE7',
          fc: '#166534'
        }
        default:
            return {
                bg: '',
                fc: ''
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
  const handleDeleteProject = async (projectId) => {
    const response = await tryCallApiAsync('DELETE', 'projects', projectId)

    if (!response.success)
      throw new Error("Failed to delete Project")

    fetchProjects();
  };

  const handleEditProject = (project) => {
    navigate('/projectxp', { state: { projectId: project.projectId }})
  };
  //#endregion

  const ProjectDetails = ({ project }) => (
    <Box sx={{ p: 3 }}>
      
      <Grid2 container columnSpacing={3} rowSpacing={5}>
        
        <Grid2 size={12}>
          <Box p={3} borderRadius={2} boxShadow={`0px 0px 5px 0px ${getStatusColor(project.status).fc}`} >
            <Typography variant="h6" gutterBottom>ID: {project.projectId}</Typography>
            
            <Typography><strong>Description:</strong></Typography>
            <Typography>{project.projectDescription}</Typography>

            <Divider sx={{marginTop: '15px'}}></Divider>
            <Typography><strong>Time Frame:</strong></Typography>
            <Typography gutterBottom>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</Typography>
            
            <Divider sx={{marginTop: '15px'}}></Divider>
            <Typography><strong>Service:</strong> </Typography>
            <Typography>{project.service}</Typography>
            <Typography>{project.price} kr/h</Typography>
          </Box>
        </Grid2>
        
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Typography><strong>Customer</strong></Typography>
          <Typography>{project.customer.firstName} {project.customer.lastName}</Typography>
          <Typography>{project.customer.email}</Typography>          
        </Grid2>
        
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Typography><strong>Contact Persons</strong></Typography>
          {project.customer.contactPersons.map( (contact) => (
            <Box key={contact.id} sx={{p: 1}}>
                <Typography>{contact.firstName} {contact.lastName}</Typography>
                <Typography>{contact.email}</Typography>
                <Typography>{contact.phoneNumber}</Typography>
            </Box>
          ))}
        </Grid2>        
        
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Typography><strong>Project Manager:</strong></Typography>
          <Typography>{project.projectManager.firstName} {project.projectManager.lastName} ({project.projectManager.role.roleName})</Typography>
          <Typography>{project.projectManager.email}</Typography>
          <Typography>{project.projectManager.phoneNumber}</Typography>
        </Grid2>

      </Grid2>      
    </Box>
  );
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{mb: 5}}>Projects</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/projectxp')}
          >
            Add Project
          </Button>
          <Button
            variant="contained"
            startIcon={<ManageAccounts />}
            onClick={() => navigate('/admin')}
          >
            Admin Panel
          </Button>
        </Box>

        <TableContainer elevation={15} component={Paper}>
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
                      <Box sx={{ padding: 1, borderRadius: 50, textAlign: 'center', backgroundColor: getStatusColor(project.status).bg}}>
                        <Typography fontSize={13} color={getStatusColor(project.status).fc}>{project.status}</Typography>
                      </Box>
                    </TableCell>
                    {!isTabletScreen && <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>}
                    {!isTabletScreen && <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>}
                    {!isDesktopScreen && <TableCell>{project.service}</TableCell>}
                    {!isDesktopScreen && <TableCell>{project.customer.companyName}</TableCell>}
                    {!isXlScreen && <TableCell>{project.projectManager.firstName}</TableCell>}
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

      </Box>
    </LocalizationProvider>
  );
};

export default ProjectTable;