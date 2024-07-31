import { Box } from '@mui/material'
import CalculateAndDisplayRoute from './CalculateAndDisplayRoute'
import DisplayCoolingshelterModalWindowContainer from '@/containers/DisplayCoolingshelterModalWindowContainer'

interface Coolingshelter {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  openingHours: string
  hasWaterServer: boolean
  hasDesk: boolean
  hasChair: boolean
  hasPowerOutlet: boolean
  hasTv: boolean
  capacity: number
  remarks: string
  image: string
}

interface AddCoolingsheltersMarkersProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  openModalWindow: boolean
  closeModalWindow: () => void
  selectedCoolingshelter: Coolingshelter
  currentUserPos: { lat: number; lng: number } | undefined
  map: google.maps.Map | null
}

const AddCoolingsheltersMarkers: React.FC<AddCoolingsheltersMarkersProps> = ({
  error,
  data,
  openModalWindow,
  closeModalWindow,
  selectedCoolingshelter,
  currentUserPos,
  map,
}) => {
  if (error) return <Box>An error has occurred.</Box>
  if (!data) return <Box>Loading...</Box>

  return (
    <>
      <DisplayCoolingshelterModalWindowContainer
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={selectedCoolingshelter.name}
        address={selectedCoolingshelter.address}
        latitude={selectedCoolingshelter.latitude}
        longitude={selectedCoolingshelter.longitude}
        openingHours={selectedCoolingshelter.openingHours}
        hasWaterServer={selectedCoolingshelter.hasWaterServer}
        hasDesk={selectedCoolingshelter.hasDesk}
        hasChair={selectedCoolingshelter.hasChair}
        hasPowerOutlet={selectedCoolingshelter.hasPowerOutlet}
        hasTv={selectedCoolingshelter.hasTv}
        capacity={selectedCoolingshelter.capacity}
        remarks={selectedCoolingshelter.remarks}
        image={selectedCoolingshelter.image}
      />
      {currentUserPos &&
        selectedCoolingshelter.latitude !== undefined &&
        selectedCoolingshelter.longitude !== undefined && (
          <CalculateAndDisplayRoute
            userPos={currentUserPos}
            latitude={selectedCoolingshelter.latitude}
            longitude={selectedCoolingshelter.longitude}
            map={map}
          />
        )}
    </>
  )
}

export default AddCoolingsheltersMarkers
