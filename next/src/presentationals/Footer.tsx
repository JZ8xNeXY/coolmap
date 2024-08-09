import { AppBar, Box, Container, Typography } from '@mui/material'

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1e3d60',
        color: '#e0f2f1',
        boxShadow: 'none',
        py: '12px',
      }}
    >
      <Container maxWidth="xl" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', width: '100%' }}
          >
            © 2024 涼快あんしんナビ All rights reserved.
          </Typography>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Footer
