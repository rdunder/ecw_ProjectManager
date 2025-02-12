import React from 'react'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    TextField,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
  } from '@mui/material';


export default function ProjectFormxp({ project, setProject, statuses, customers, services, projectManagers }) {
  return (
    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
      <DatePicker
        label="Start Date"
        value={project.startDate}
        onChange={(newDate) => setProject({ ...project, startDate: newDate })}
      />
      <DatePicker
        label="End Date"
        value={project.endDate}
        onChange={(newDate) => setProject({ ...project, endDate: newDate })}
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={project.statusId}
          label="Status"
          onChange={(e) => setProject({ ...project, statusId: e.target.value })}
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
          value={project.customerId}
          label="Customer"
          onChange={(e) => setProject({ ...project, customerId: e.target.value })}
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
          value={project.serviceId}
          label="Service"
          onChange={(e) => setProject({ ...project, serviceId: e.target.value })}
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
          value={project.projectManagerId}
          label="Project Manager"
          onChange={(e) => setProject({ ...project, projectManagerId: e.target.value })}
        >
          {projectManagers.map(pm => (
            <MenuItem key={pm.employmentNumber} value={pm.employmentNumber}>
              {`${pm.firstName} ${pm.lastName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
