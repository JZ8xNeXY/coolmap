// import AddLocationIcon from '@mui/icons-material/AddLocation'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'
// import AddSimpleRestroomContainer from '@/containers/AddSimpleRestroomContainer'

interface UserProps {
  email: string
  id: number
  isFetched: boolean
  isSignedIn: boolean
}

interface HeaderProps {
  user: UserProps
  isOpen: boolean
  openDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
  openAddSimpleRestroomModal: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOpenAddSimpleRestroomModal: any
  list: () => JSX.Element
}

const Header: React.FC<HeaderProps> = ({
  // user,
  isOpen,
  openDrawer,
  // openAddSimpleRestroomModal,
  // setOpenAddSimpleRestroomModal,
  list,
}) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1e3d60',
        color: '#ffffff',
        boxShadow: 'none',
        py: '12px',
      }}
    >
      <Container maxWidth="xl" sx={{ px: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Drawer anchor="left" open={isOpen} onClose={openDrawer(false)}>
              {list()}
            </Drawer>
            <Link href="/" passHref>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: '#e0f2f1',
                  textDecoration: 'none',
                }}
              >
                熱中症安心サポート
              </Typography>
            </Link>
          </Box>
          {/* {user && (
            <Typography
              variant="body1"
              component="div"
              sx={{ ml: 2, fontStyle: 'italic' }}
            >
              管理者権限でログイン中
            </Typography>
          )} */}
          {/* <IconButton
            edge="end"
            color="inherit"
            aria-label="add location"
            onClick={() => setOpenAddSimpleRestroomModal(true)}
          >
            <AddLocationIcon sx={{ fontSize: 35 }} />
          </IconButton>
          <AddSimpleRestroomContainer
            open={openAddSimpleRestroomModal}
            onClose={() => setOpenAddSimpleRestroomModal(false)}
          /> */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
