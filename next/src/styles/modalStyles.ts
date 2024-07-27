const modalStyle = {
  position: 'absolute' as const,
  top: '48.5%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',
    sm: '65%',
    md: '46%',
    lg: '38%',
    xl: '28%',
  },
  height: '80%',
  bgcolor: '#F9F9F9',
  boxShadow: 24,
  p: 3,
  overflow: 'auto',
  borderRadius: '10px',
}

export default modalStyle
