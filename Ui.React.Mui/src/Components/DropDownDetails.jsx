import React from 'react'

export function ProjectDetails({ project }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Project Details</Typography>
      <Grid2 container columnSpacing={3} rowSpacing={5}>
        <Grid2 size={12}>
          <Typography><strong>Description:</strong> {project.projectDescription}</Typography>
          <Typography><strong>Time Frame:</strong> {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</Typography>
          
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography><strong>Customer:</strong> {getCustomerName(project.customerId)}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography><strong>Project Manager:</strong> {getProjectManagerName(project.projectManagerId)}</Typography>
        </Grid2>
      </Grid2>      
    </Box>
  )
}