import React from 'react'
import StatusesTable from '../Components/StatusesTable'
import ServiceTable from '../Components/ServicesTable'
import RolesTable from '../Components/RolesTable'
import ContactPersonsTable from '../Components/ContactPersonsTable'
import CustomersTable from '../Components/CustomersTable'
import EmployeesTable from '../Components/EmployeeTable'

import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
// import { Link } from 'react-router'

export default function AdminPage({cookies}) {
    


  return (
    <Box>

      <Breadcrumbs separator=">" color="#1976D2" aria-label="breadcrumb">
          <Link fontSize={18} underline="hover" color="white" href="/">Home</Link>
          <Link fontSize={18} underline="hover" color="#81B9F0" href="/admin" >Admin Page</Link>
      </Breadcrumbs>

      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center', 
          mt: 5}}>

        <Box
          maxWidth={800}
          sx={{
            display: 'flex', 
            justifyContent: 'space-evenly', 
            flexDirection: 'column'}}>

            <ServiceTable cookies={cookies} />
            <StatusesTable cookies={cookies} />

            <EmployeesTable cookies={cookies} />
            <RolesTable cookies={cookies} />

            <CustomersTable cookies={cookies} />
            <ContactPersonsTable cookies={cookies} />
        </Box>        
      </Box>
    </Box>
  )
}
