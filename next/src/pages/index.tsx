import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddMarkersContainer from '@/containers/AddMarkersContainer'
import AddRestroomContainer from '@/containers/AddRestroomContainer'
import { CoolingshelterProvider } from '@/context/CoolingshelterContext'
import { SessionProvider } from '@/context/SessionContext'
import { WaterserverProvider } from '@/context/WaterserverContext'
import { RightClickMapHandler } from '@/utils/RightClickMapHandler'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'
import { userGeoLocation } from '@/utils/userGeoLocation'
import { getWbgtIndex } from '@/utils/wbgt'
import { getWeatherData } from '@/utils/weather'

const Index: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [openAddRestroomModal, setOpenAddRestroomModal] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  )
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [wbgtIndex, setWbgtIndex] = useState<string>('取得中...')

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  useEffect(() => {
    if (map) {
      RightClickMapHandler({ map, setMap, setOpenAddRestroomModal, setCoords })
      userGeoLocation({ map, setCurrentUserPos: () => {} })
    }
  }, [map])

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData()
      setWeather(data)
    }

    fetchWeather()
  }, [])

  useEffect(() => {
    const fetchWbgtIndex = async () => {
      const index = await getWbgtIndex()
      setWbgtIndex(index)
    }

    fetchWbgtIndex()
  }, [])

  const todayForecast = weather?.forecasts[0]

  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {todayForecast ? (
              <>
                <p>{todayForecast.telop}</p>
                <Image
                  src={todayForecast.image.url}
                  alt={todayForecast.image.title}
                  width={todayForecast.image.width}
                  height={todayForecast.image.height}
                />
              </>
            ) : (
              <p>天気情報を取得中...</p>
            )}
            <p> 東京の暑さ指数: {wbgtIndex}</p>
          </div>
        </Box>
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
