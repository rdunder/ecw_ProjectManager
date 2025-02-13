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


const RolesForm = ({ data, setData }) => {    
    return (
    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            label="Role Name"
            fullWidth
            value={data.roleName || ''}
            onChange={(e) => setData({ ...data, roleName: e.target.value })}
        />
    </Box>
)};

export default function RolesTable() {

//#region   UseStates...
  const [roles, setRoles]   = useState([]); 

  const [expandedRows, setExpandedRows] = useState(new Set());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  
  const [expanded, setExpanded] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    roleName: ""
  });
//#endregion

//#region   Data Fetching Functions
  useEffect(() => {
    async function fetchData() {
      try {
        const roleResponse = await tryCallApiAsync('GET', 'roles')
           

        if (!roleResponse.success) {
          throw new Error('One or more API calls failed');
        }
        
        setRoles(roleResponse.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();

    }, []);

  async function fetchRoles()
  {
    const rolesResponse = await tryCallApiAsync('GET', 'roles')
    if (!rolesResponse.success)
      throw new Error('Fetching Roles failed');
    setRoles(rolesResponse.data)
  }
//#endregion
 
//#region   Helper functions

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

//#endregion

//#region     CRUD Functions
  const handleAddRole = async () => {
    const roleToAdd = {
      ...newRole
    };

    const res = await tryCallApiAsync("POST", "roles", null, roleToAdd)

    if (!res.success) {
      throw new Error("failed to add role")
    }

    fetchRoles();
    setOpenAddDialog(false);
    setNewRole({
      roleName: ""
    });
  };

  const handleDeleteRole = async (roleId) => {
    const res = await tryCallApiAsync("DELETE", "roles", roleId)

    if (!res.success) {
      throw new Error("failed to delete role")
    }

    fetchRoles();
  };

  const handleEditRole = (role) => {
    setEditingRole({
      ...role
    });
    setOpenEditDialog(true);
  };

  const handleUpdateRole = async () => {
    const updatedRole = {
      ...editingRole
    };

    const res = await tryCallApiAsync("PUT", "roles", editingRole.id, updatedRole)

    if (!res.success) {
      throw new Error("failed to update role")
    }

    fetchRoles()
    setOpenEditDialog(false);
    setEditingRole(null);
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
              Roles
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
            Add Role
          </Button>
        </Box>

        <Collapse in={expanded}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <React.Fragment key={role.id}>
                  <TableRow>
                    <TableCell>{role.id}</TableCell>
                    <TableCell>{role.roleName}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditRole(role)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteRole(role.id)} color="error">
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
          <DialogTitle>Add New Role</DialogTitle>
          <DialogContent>
            <RolesForm data={newRole} setData={setNewRole} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddRole} variant="contained">Add Role</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogContent>
            {editingRole && (
              <RolesForm data={editingRole} setData={setEditingRole} />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateRole} variant="contained">Update Role</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};


