const facilityStyle = {
  maxWidth: '150px',
  pl: 1,
  pr: 1,
  ml: 2,
  mt: 1,
  mb: 1,
  border: '1px solid black',
  borderRadius: '5px',
  color: '#000000',
  opacity: 0.8,
}

const nursingRoomStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(255, 182, 193, 0.7)',
}

const anyoneToiletStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(173, 216, 230, 0.7)',
}

const diaperChangingStationStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(144, 238, 144, 0.7)',
}

const powderCornerStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(255, 215, 0, 0.7)',
}

const strollerAccessibleStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(255, 160, 122, 0.7)',
}

export {
  facilityStyle,
  nursingRoomStyle,
  anyoneToiletStyle,
  diaperChangingStationStyle,
  powderCornerStyle,
  strollerAccessibleStyle,
}
