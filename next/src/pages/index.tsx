import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AddMarkersContainer from '@/containers/AddMarkersContainer'
import AddRestroomContainer from '@/containers/AddRestroomContainer'
import { CoolingshelterProvider } from '@/context/CoolingshelterContext'
import { SessionProvider } from '@/context/SessionContext'
import { WaterserverProvider } from '@/context/WaterserverContext'
import { RightClickMapHandler } from '@/utils/RightClickMapHandler'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'
import { userGeoLocation } from '@/utils/userGeoLocation'

const Index: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const [openAddRestroomModal, setOpenAddRestroomModal] = useState(false)

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  )

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  useEffect(() => {
    if (map) {
      RightClickMapHandler({ map, setMap, setOpenAddRestroomModal, setCoords })
      userGeoLocation({ map, setCurrentUserPos: () => {} })
    }
  }, [map])

  return (
    <>
      <Container maxWidth="xl">
        <SessionProvider>
          <CoolingshelterProvider>
            <WaterserverProvider>
              <AddMarkersContainer map={map} />
            </WaterserverProvider>
            <AddRestroomContainer
              open={openAddRestroomModal}
              onClose={() => setOpenAddRestroomModal(false)}
              coords={coords}
            />
          </CoolingshelterProvider>
        </SessionProvider>
        <Box id="map" style={{ height: '80vh', width: '100%' }}></Box>
        <Box id="infoPanel"></Box>
      </Container>
    </>
  )
}

export default Index
