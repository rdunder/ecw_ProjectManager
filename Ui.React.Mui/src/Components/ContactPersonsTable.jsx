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


const ContactPersonForm = ({ data, setData, customers }) => {    
    return (
    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            label="First Name"
            fullWidth
            value={data.firstName || ''}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
        />
        <TextField
            label="Last Name"
            fullWidth
            value={data.lastName || ''}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
        />
        <TextField
            label="Email"
            fullWidth
            value={data.email || ''}
            onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
            label="Phone Number"
            fullWidth
            value={data.phoneNumber || ''}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
        />
        <FormControl fullWidth>
        <InputLabel>Customer</InputLabel>
        <Select
          value={data.customerId}
          label="Customer"
          onChange={(e) => setData({ ...data, customerId: e.target.value })}
        >
          {customers.map(customer => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.companyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
)};

export default function ContactPersonsTable({cookies}) {

//#region   UseStates...
  const [contactPersons, setContactPersons]   = useState([]);
  const [customers, setCustomers] = useState([]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  
  const [expanded, setExpanded] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [editingContactPerson, setEditingContactPerson] = useState(null);
  const [newContactPerson, setNewContactPerson] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    customerId: 1
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
        const [contactPersonResponse, customerRespons] = 
            await Promise.all([
                tryCallApiAsync('GET', 'contact-persons'),
                tryCallApiAsync('GET', 'customers')
            ]) 
           

        if (!contactPersonResponse.success ||
            !customerRespons.success) {
          throw new Error('One or more API calls failed');
        }
        
        setContactPersons(contactPersonResponse.data);
        setCustomers(customerRespons.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();

    }, []);

  async function fetchContactPersons()
  {
    const contactPersonResponse = await tryCallApiAsync('GET', 'contact-persons')
    if (!contactPersonResponse.success)
      throw new Error('Fetching Contact Persons failed');
    setContactPersons(contactPersonResponse.data)
  }
//#endregion
 
//#region   Helper functions

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

//#endregion

//#region     CRUD Functions
  const handleAddContactPerson = async () => {
    const contactPersonToAdd = {
      ...newContactPerson
    };

    const response = await tryCallApiAsync('POST', 'contact-persons', null, contactPersonToAdd, cookies.accessToken);

    if (!response.success) {
      throw new Error('Failed to create contact person');
    }

    fetchContactPersons();
    setOpenAddDialog(false);
    setNewContactPerson({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        customerId: 1
    });
  };

  const handleDeleteContactPerson = async (contactPersonId) => {
    const res = await tryCallApiAsync("DELETE", "contact-persons", contactPersonId, null, cookies.accessToken)

    if (!res.success) {
      throw new Error("failed to delete contact person")
    }

    fetchContactPersons();
  };

  const handleEditContactPerson = (contactPerson) => {
    setEditingContactPerson({
      ...contactPerson
    });
    setOpenEditDialog(true);
  };

  const handleUpdateContactPerson = async () => {
    const updatedContactPerson = {
      ...editingContactPerson
    };

    const res = await tryCallApiAsync("PUT", "contact-persons", editingContactPerson.id, updatedContactPerson, cookies.accessToken)

    if (!res.success) {
      throw new Error("failed to update contact person")
    }

    fetchContactPersons();
    setOpenEditDialog(false);
    setEditingContactPerson(null);
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

          <Typography 
            variant="h5"
            sx={{
              fontSize: {
                xs: '15px',
                sm: '16px',
                md: '18px',
                lg: '20px',
                xl: '22px'
              }
            }}
            >
              Contact Persons
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
            }}
          >
            Add Contact Person
          </Button>
        </Box>

        <Collapse in={expanded}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {!isDesktopScreen && <TableCell>Id</TableCell>}
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                {!isTabletScreen && <TableCell>Email</TableCell>}
                {!isDesktopScreen && <TableCell>Phone Number</TableCell>}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactPersons.map((contactPerson) => (
                <React.Fragment key={contactPerson.id}>
                  <TableRow>
                    {!isDesktopScreen && <TableCell>{contactPerson.id}</TableCell>}
                    <TableCell>{contactPerson.firstName}</TableCell>
                    <TableCell>{contactPerson.lastName}</TableCell>
                    {!isTabletScreen && <TableCell>{contactPerson.email}</TableCell>}
                    {!isDesktopScreen && <TableCell>{contactPerson.phoneNumber}</TableCell>}
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditContactPerson(contactPerson)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteContactPerson(contactPerson.id)} color="error">
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
          <DialogTitle>Add New Contact Person</DialogTitle>
          <DialogContent>
            <ContactPersonForm 
                data={newContactPerson} 
                setData={setNewContactPerson} 
                customers={customers}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddContactPerson} variant="contained">Add Contact Person</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Contact Person</DialogTitle>
          <DialogContent>
            {editingContactPerson && (
              <ContactPersonForm 
                data={editingContactPerson} 
                setData={setEditingContactPerson} 
                customers={customers}/>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateContactPerson} variant="contained">Update Contact Person</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};


