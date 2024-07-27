import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#4BAF51',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
