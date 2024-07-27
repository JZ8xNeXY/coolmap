import { AppBar, Box, Container } from '@mui/material'

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        py: '12px',
      }}
    >
      <Container maxWidth="xl" sx={{ px: 2, mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        ></Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          Copyright © Quick Clean Restroom Map All rights reserved.
        </Box>
      </Container>
    </AppBar>
  )
}

export default Footer
