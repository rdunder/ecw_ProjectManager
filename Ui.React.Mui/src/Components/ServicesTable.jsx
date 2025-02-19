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
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  TextField,
  Collapse,
} from '@mui/material';

import {
  KeyboardArrowDown,
  KeyboardArrowRight,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { tryCallApiAsync } from '../Helpers/ApiCalls';
//#endregion


const ServiceForm = ({ data, setData }) => {    
    return (
    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            label="Service Name"
            fullWidth
            value={data.serviceName || ''}
            onChange={(e) => setData({ ...data, serviceName: e.target.value })}
        />
        <TextField
            label="Price"
            fullWidth
            value={data.price || ''}
            onChange={(e) => setData({ ...data, price: e.target.value })}
        />
    </Box>
)};

export default function ServicesTable({cookies}) {


//#region   UseStates...
  const [services, setServices]   = useState([]); 

  const [expandedRows, setExpandedRows] = useState(new Set());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: "",
    price: 0
  });
//#endregion

//#region   Loacl Variables
  const theme = useTheme();
  const isTabletScreen = useMediaQuery(theme.breakpoints.down("md"))
  const isDesktopScreen = useMediaQuery(theme.breakpoints.down("lg"))
  const isXlScreen = useMediaQuery(theme.breakpoints.down("xl"))
//#endregion

//#region   Data Fetching Functions
  useEffect(() => {
    async function fetchData() {
      try {
        const serviceResponse = await tryCallApiAsync('GET', 'services')
           

        if (!serviceResponse.success) {
          throw new Error('One or more API calls failed');
        }
        
        setServices(serviceResponse.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();

    }, []);

  async function fetchServices()
  {
    const serviceResponse = await tryCallApiAsync('GET', 'services')
    if (!serviceResponse.success)
      throw new Error('Fetching Services failed');
    setServices(serviceResponse.data)
  }
//#endregion
 
//#region   Helper functions
    const toggleRow = (serviceId) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(serviceId)) {
            newExpandedRows.delete(serviceId);
        } else {
            newExpandedRows.add(serviceId);
        }
        setExpandedRows(newExpandedRows);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

//#endregion

//#region     CRUD Functions
  const handleAddService = async () => {
    const serviceToAdd = {
      ...newService
    };

    console.log(`handleAddservice Adding: ${serviceToAdd.serviceName}`)

    const res = await tryCallApiAsync("POST", "services", null, serviceToAdd, cookies.accessToken)

    if (!res.success)
    {
      throw new Error("failed to add new service")
    }

    fetchServices();
    setOpenAddDialog(false);
    setNewService({
        serviceName: "",
        price: 0
    });
  };

  const handleDeleteService = async (serviceId) => {

    console.log(`handleDeleteService Deleting: ${serviceId}`)

    const res = await tryCallApiAsync("DELETE", "services", serviceId, null, cookies.accessToken)

    if (!res.success)
      throw new Error("Failed to delete Service")

    fetchServices();
  };

  const handleEditService = (service) => {
    setEditingService({
      ...service
    });
    setOpenEditDialog(true);
  };

  const handleUpdateService = async () => {
    const updatedService = {
      ...editingService
    };


    const res = await tryCallApiAsync("PUT", "services", editingService.id, updatedService, cookies.accessToken)

    if (!res.success) {
      throw new Error("failed to update service")
    }

    fetchServices();
    setOpenEditDialog(false);
    setEditingService(null);
  };
  //#endregion


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Box sx={{            
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1            
          }}>

        <IconButton 
            onClick={handleExpandClick}
            sx={{ ml: 1, color: 'white' }}>
                {expanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        </IconButton>

          <Typography 
            variant="h5"
            sx={{
            fontSize: {
              xs: '15px',
              sm: '16px',
              md: '18px',
              lg: '20px',
              xl: '22px'
            } }} 
            >
            Services
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
            sx={{
              fontSize: {
                xs: '12px',
                sm: '13px',
                md: '14px',
                lg: '14px'
              },
              padding: {
                xs: '6px 12px',
                sm: '8px 16px',
              }
            }}>
            Add Service
          </Button>
        </Box>

        <Collapse in={expanded}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <React.Fragment key={service.id}>
                  <TableRow>
                    <TableCell>{service.id}</TableCell>
                    <TableCell>{service.serviceName}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditService(service)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteService(service.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Collapse>

        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogContent>
            <ServiceForm data={newService} setData={setNewService} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddService} variant="contained">Add Service</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogContent>
            {editingService && (
              <ServiceForm data={editingService} setData={setEditingService} />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateService} variant="contained">Update Service</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};


