import { Box, Button, Paper, Typography } from '@mui/material'

export default function Home() {
  return (
    <Paper elevation={0} sx={{ padding: 1 }}>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} margin={2}>
        <Typography variant="h1" color="text.primary">
          My Organization
        </Typography>
        <Button variant="contained">Save</Button>
        <Button variant="contained" color="secondary">
          Delete
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
      </Box>
    </Paper>
  )
}
