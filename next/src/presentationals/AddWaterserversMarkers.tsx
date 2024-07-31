import { Box } from '@mui/material'
import CalculateAndDisplayRoute from './CalculateAndDisplayRoute'
// import DisplayModalWindowContainer from '@/containers/DisplayModalWindowContainer'

interface Waterserver {
  id: number
  name: string
  address: string
  place: string
  latitude: number
  longitude: number
  spoutType: boolean
  bottleDispenserType: boolean
  image: string
}

interface AddWaterserversMarkersProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  openModalWindow: boolean
  closeModalWindow: () => void
  selectedWaterserver: Waterserver
  currentUserPos: { lat: number; lng: number } | undefined
  map: google.maps.Map | null
}

const AddWaterserversMarkers: React.FC<AddWaterserversMarkersProps> = ({
  error,
  data,
  openModalWindow,
  closeModalWindow,
  selectedWaterserver,
  currentUserPos,
  map,
}) => {
  if (error) return <Box>An error has occurred.</Box>
  if (!data) return <Box>Loading...</Box>

  return (
    <>
      {/* <DisplayModalWindowContainer
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={selectedWaterserver.name}
        address={selectedWaterserver.address}
        place={selectedWaterserver.place}
        latitude={selectedWaterserver.latitude}
        longitude={selectedWaterserver.longitude}
        spoutType={selectedWaterserver.spoutType}
        bottleDispenserType={selectedWaterserver.bottleDispenserType}
        image={selectedWaterserver.image}
      /> */}
      {currentUserPos &&
        selectedWaterserver.latitude !== undefined &&
        selectedWaterserver.longitude !== undefined && (
          <CalculateAndDisplayRoute
            userPos={currentUserPos}
            latitude={selectedWaterserver.latitude}
            longitude={selectedWaterserver.longitude}
            map={map}
          />
        )}
    </>
  )
}

export default AddWaterserversMarkers
