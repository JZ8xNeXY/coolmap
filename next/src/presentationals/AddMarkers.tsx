import { Box } from '@mui/material'
import CalculateAndDisplayRoute from './CalculateAndDisplayRoute'
import DisplayModalWindowContainer from '@/containers/DisplayModalWindowContainer'

interface Restroom {
  id: number
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursingRoom: boolean
  anyoneToilet: boolean
  diaperChangingStation: boolean
  powderCorner: boolean
  strollerAccessible: boolean
  evaluation: number
  image: string
}

interface AddMarkersProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  openModalWindow: boolean
  closeModalWindow: () => void
  selectedRestroom: Restroom
  currentUserPos: { lat: number; lng: number } | undefined
  map: google.maps.Map | null
}

const AddMarkers: React.FC<AddMarkersProps> = ({
  error,
  data,
  openModalWindow,
  closeModalWindow,
  selectedRestroom,
  currentUserPos,
  map,
}) => {
  if (error) return <Box>An error has occurred.</Box>
  if (!data) return <Box>Loading...</Box>

  return (
    <>
      <DisplayModalWindowContainer
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={selectedRestroom.name}
        address={selectedRestroom.address}
        content={selectedRestroom.content}
        latitude={selectedRestroom.latitude}
        longitude={selectedRestroom.longitude}
        nursingRoom={selectedRestroom.nursingRoom}
        anyoneToilet={selectedRestroom.anyoneToilet}
        diaperChangingStation={selectedRestroom.diaperChangingStation}
        powderCorner={selectedRestroom.powderCorner}
        strollerAccessible={selectedRestroom.strollerAccessible}
        evaluation={selectedRestroom.evaluation}
        image={selectedRestroom.image}
      />
      {currentUserPos &&
        selectedRestroom.latitude !== undefined &&
        selectedRestroom.longitude !== undefined && (
          <CalculateAndDisplayRoute
            userPos={currentUserPos}
            latitude={selectedRestroom.latitude}
            longitude={selectedRestroom.longitude}
            map={map}
          />
        )}
    </>
  )
}

export default AddMarkers
