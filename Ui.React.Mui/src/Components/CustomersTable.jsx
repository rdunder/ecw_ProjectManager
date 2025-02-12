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
  TextField,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
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


const CustomerForm = ({ data, setData }) => {    
    return (
    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            label="Company Name"
            fullWidth
            value={data.companyName || ''}
            onChange={(e) => setData({ ...data, companyName: e.target.value })}
        />
        <TextField
            label="Email"
            fullWidth
            value={data.email || ''}
            onChange={(e) => setData({ ...data, email: e.target.value })}
        />
    </Box>
)};

export default function CustomersTable() {

//#region   UseStates...
  const [customers, setCustomers] = useState([]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  
  const [expanded, setExpanded] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    companyName: "",
    email: ""
  });
//#endregion

  //#region   Local Variables

  const theme = useTheme();
  const isTabletScreen = useMediaQuery(theme.breakpoints.down("md"))
  const isDesktopScreen = useMediaQuery(theme.breakpoints.down("lg"))
  const isXlScreen = useMediaQuery(theme.breakpoints.down("xl"))
  //#endregion

//#region   Data Fetching Functions
  useEffect(() => {
    async function fetchData() {
      try {
        const customerRespons = await tryCallApiAsync('GET', 'customers')
           

        if (!customerRespons.success) {
          throw new Error('One or more API calls failed');
        }
        
        setCustomers(customerRespons.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();

    }, []);

  async function fetchCustomers()
  {
    const customerResponse = await tryCallApiAsync('GET', 'customers')
    if (!customerResponse.success)
      throw new Error('Fetching Customers failed');
    setCustomers(customerResponse.data)
  }
//#endregion
 
//#region   Helper functions

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

//#endregion

//#region     CRUD Functions
  const handleAddCustomers = async () => {
    const customerToAdd = {
      ...newCustomer
    };

    console.log(`handleAddCustomers Adding: ${customerToAdd.companyName}`)

    const response = await tryCallApiAsync('POST', 'customers', null, customerToAdd);

    if (!response.success) {
      throw new Error('Failed to create customer');
    }

    fetchCustomers();
    setOpenAddDialog(false);
    setNewCustomer({
        companyName: "",
        email: "",
    });
  };

  const handleDeleteCustomer = async (customerId) => {

    console.log(`handleDeleteCustomer Deleting: ${customerId}`)


    // const response = await tryCallApiAsync('DELETE', 'projects', statusId)

    // if (!response.success)
    //   throw new Error("Failed to delete Project")

    // fetchStatuses();
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer({
      ...customer
    });
    setOpenEditDialog(true);
  };

  const handleUpdateCustomer = async () => {
    const updatedCustomer = {
      ...editingCustomer
    };

    console.log(`handleUpdateCustomer Updating: ${updatedCustomer.companyName}`)

    // const response = await tryCallApiAsync('PUT', 'projects', editingStatus.projectId, updatedProject);

    // if (!response.success) {
    //   throw new Error('Failed to create project');
    // }

    // fetchStatuses();
    setOpenEditDialog(false);
    setEditingCustomer(null);
  };
  //#endregion


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1 }}>

        <IconButton 
            onClick={handleExpandClick}
            sx={{ ml: 1, color: 'white' }}>
                {expanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        </IconButton>

          <Typography variant="h5">Customers</Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Customer
          </Button>
        </Box>

        <Collapse in={expanded}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              {!isTabletScreen && <TableCell>Id</TableCell>}
                <TableCell>Company Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <React.Fragment key={customer.id}>
                  <TableRow>
                  {!isTabletScreen && <TableCell>{customer.id}</TableCell>}
                    <TableCell>{customer.companyName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditCustomer(customer)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteCustomer(customer.id)} color="error">
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
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogContent>
            <CustomerForm 
                data={newCustomer} 
                setData={setNewCustomer} 
                customers={customers}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddCustomers} variant="contained">Add Customer</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            {editingCustomer && (
              <CustomerForm 
                data={editingCustomer} 
                setData={setEditingCustomer} 
                customers={customers}/>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateCustomer} variant="contained">Update Customer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};


