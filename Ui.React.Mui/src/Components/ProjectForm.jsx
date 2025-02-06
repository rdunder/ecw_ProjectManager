import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    TextField,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
  } from '@mui/material';


const ProjectForm = ({ data, setData, statuses, customers, services, projectManagers }) => {
    
    return (
    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Project Name"
        fullWidth
        value={data.projectName || ''}
        onChange={(e) => setData({ ...data, projectName: e.target.value })}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={data.projectDescription || ''}
        onChange={(e) => setData({ ...data, projectDescription: e.target.value })}
      />
      <DatePicker
        label="Start Date"
        value={data.startDate}
        onChange={(newDate) => setData({ ...data, startDate: newDate })}
      />
      <DatePicker
        label="End Date"
        value={data.endDate}
        onChange={(newDate) => setData({ ...data, endDate: newDate })}
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={data.statusId}
          label="Status"
          onChange={(e) => setData({ ...data, statusId: e.target.value })}
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
      <FormControl fullWidth>
        <InputLabel>Service</InputLabel>
        <Select
          value={data.serviceId}
          label="Service"
          onChange={(e) => setData({ ...data, serviceId: e.target.value })}
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
          value={data.projectManagerId}
          label="Project Manager"
          onChange={(e) => setData({ ...data, projectManagerId: e.target.value })}
        >
          {projectManagers.map(pm => (
            <MenuItem key={pm.employmentNumber} value={pm.employmentNumber}>
              {`${pm.firstName} ${pm.lastName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )};

  export default ProjectForm;