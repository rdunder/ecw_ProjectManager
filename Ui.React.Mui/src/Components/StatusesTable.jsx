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


const StatusForm = ({ data, setData }) => {    
    return (
    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            label="Status Name"
            fullWidth
            value={data.statusName || ''}
            onChange={(e) => setData({ ...data, statusName: e.target.value })}
        />
    </Box>
)};

export default function StatusesTable({cookies}) {

//#region   UseStates...
  const [statuses, setStatuses]   = useState([]); 

  const [expandedRows, setExpandedRows] = useState(new Set());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [expanded, setExpanded] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newStatus, setNewStatus] = useState({
    stausName: ""
  });
//#endregion

//#region   Data Fetching Functions
  useEffect(() => {
    async function fetchData() {
      try {
        const statusResponse = await tryCallApiAsync('GET', 'statuses')
           

        if (!statusResponse.success) {
          throw new Error('One or more API calls failed');
        }
        
        setStatuses(statusResponse.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();

    }, []);

  async function fetchStatuses()
  {
    const statusResponse = await tryCallApiAsync('GET', 'statuses')
    if (!statusResponse.success)
      throw new Error('Fetching Projects failed');
    setStatuses(statusResponse.data)
  }
//#endregion
 
//#region   Helper functions

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

//#endregion

//#region     CRUD Functions
  const handleAddStatus = async () => {
    const statusToAdd = {
      ...newStatus
    };

    const res = await tryCallApiAsync("POST", "statuses", null, statusToAdd, cookies.accessToken)

    if (!res.success) {
      throw new Error("failed to add status")
    }

    fetchStatuses();
    setOpenAddDialog(false);
    setNewStatus({
      stausName: ""
    });
  };

  const handleDeleteStatus = async (statusId) => {
    const res = await tryCallApiAsync("DELETE", "statuses", statusId, null, cookies.accessToken)

    if (!res.success) {
      throw new Error("failed to delete status")
    }

    fetchStatuses()
  };

  const handleEditStatus = (status) => {
    setEditingStatus({
      ...status
    });
    setOpenEditDialog(true);
  };

  const handleUpdateStatus = async () => {
    const updatedStatus = {
      ...editingStatus
    };

    const res = await tryCallApiAsync("PUT", "statuses", editingStatus.id, updatedStatus, cookies.accessToken)

    if (!res.success) {
      throw new Error("failed to update status")
    }

    fetchStatuses();
    setOpenEditDialog(false);
    setEditingStatus(null);
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
              Statuses
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
            Add Status
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
              {statuses.map((status) => (
                <React.Fragment key={status.id}>
                  <TableRow>
                    <TableCell>{status.id}</TableCell>
                    <TableCell>{status.statusName}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditStatus(status)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteStatus(status.id)} color="error">
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
          <DialogTitle>Add New Status</DialogTitle>
          <DialogContent>
            <StatusForm data={newStatus} setData={setNewStatus} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddStatus} variant="contained">Add Project</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Status</DialogTitle>
          <DialogContent>
            {editingStatus && (
              <StatusForm data={editingStatus} setData={setEditingStatus} />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateStatus} variant="contained">Update Project</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};


