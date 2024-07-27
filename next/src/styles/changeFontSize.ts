const changeFontSize = (name: string) => {
  if (name.length >= 15) {
    return {
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '0 auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  } else if (name.length >= 10) {
    return {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '0 auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  } else {
    return {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '0 auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  }
}

export default changeFontSize
