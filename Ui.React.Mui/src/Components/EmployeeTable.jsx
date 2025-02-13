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


const EmployeeForm = ({ data, setData, roles }) => {    
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
        <InputLabel>Role</InputLabel>
        <Select
          value={data.roleId}
          label="Role"
          onChange={(e) => setData({ ...data, roleId: e.target.value })}
        >
          {roles.map(role => (
            <MenuItem key={role.id} value={role.id}>
              {role.roleName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
)};

export default function EmployeesTable() {

//#region   UseStates...
  const [employees, setEmployees]   = useState([]);
  const [roles, setRoles] = useState([]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  
  const [expanded, setExpanded] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roleId: 1
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
        const [employeeRespons, rolesRespons] = 
            await Promise.all([
                tryCallApiAsync('GET', 'employees'),
                tryCallApiAsync('GET', 'roles')
            ]) 
           

        if (!employeeRespons.success ||
            !rolesRespons.success) {
          throw new Error('One or more API calls failed');
        }
        
        setEmployees(employeeRespons.data);
        setRoles(rolesRespons.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();

    }, []);

  async function fetchEmployees()
  {
    const EmployeesRespons = await tryCallApiAsync('GET', 'employees')
    if (!EmployeesRespons.success)
      throw new Error('Fetching Employees failed');
    setEmployees(EmployeesRespons.data)
  }
//#endregion
 
//#region   Helper functions

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

//#endregion

//#region     CRUD Functions
  const handleAddEmployee = async () => {
    const employeeToAdd = {
      ...newEmployee
    };

    const res = await tryCallApiAsync("POST", "employees", null, employeeToAdd)

    if (!res.success) {
      throw new Error("failed to add Employee")
    }
    fetchEmployees();
    setOpenAddDialog(false);
    setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        roleId: 1
    });
  };

  const handleDeleteEmployee = async (employeeId) => {
    const res = await tryCallApiAsync("DELETE", "employees", employeeId)

    if (!res.success) {
      throw new Error("failed to delete employee")
    }

    fetchEmployees()
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee({
      employmentNumber: employee.employmentNumber,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      roleId: employee.role.id
    });
    setOpenEditDialog(true);
  };

  const handleUpdateEmployee = async () => {
    const updatedEmployee = {
      ...editingEmployee
    };

    const res = await tryCallApiAsync("PUT", "employees", editingEmployee.employmentNumber, updatedEmployee)

    if (!res.success) {
      throw new Error("failed to update employee")
    }

    fetchEmployees()
    setOpenEditDialog(false);
    setEditingEmployee(null);
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
              Employees
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
            Add Employee
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
              {employees.map((employee) => (
                <React.Fragment key={employee.employmentNumber}>
                  <TableRow>
                    {!isDesktopScreen && <TableCell>{employee.employmentNumber}</TableCell>}
                    <TableCell>{employee.firstName}</TableCell>
                    <TableCell>{employee.lastName}</TableCell>
                    {!isTabletScreen && <TableCell>{employee.email}</TableCell>}
                    {!isDesktopScreen && <TableCell>{employee.phoneNumber}</TableCell>}
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditEmployee(employee)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteEmployee(employee.employmentNumber)} color="error">
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
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogContent>
            <EmployeeForm 
                data={newEmployee} 
                setData={setNewEmployee} 
                roles={roles}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddEmployee} variant="contained">Add Employee</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            {editingEmployee && (
              <EmployeeForm 
                data={editingEmployee} 
                setData={setEditingEmployee} 
                roles={roles}/>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateEmployee} variant="contained">Update Employee</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};


