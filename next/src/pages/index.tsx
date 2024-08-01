import { Box, Container } from '@mui/material'
import axios from 'axios'
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
import { getWeatherData } from '@/utils/weather'

const Index: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [openAddRestroomModal, setOpenAddRestroomModal] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  )
  const [weather, setWeather] = useState<any>(null)
  const [data, setData] = useState({ wbgtIndex: null, targetDate: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getWeatherData()
        setWeather(weatherData)

        const response = await axios.get('/api/wbgt')
        setData(response.data)

        setLoading(false)
      } catch (error) {
        console.error('データ取得に失敗しました', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!loading) {
      loadGoogleMapsAPI(setMap)
    }
  }, [loading])

  useEffect(() => {
    if (map) {
      RightClickMapHandler({ map, setMap, setOpenAddRestroomModal, setCoords })
      userGeoLocation({ map, setCurrentUserPos: () => {} })
    }
  }, [map])

  const todayForecast = weather?.forecasts?.[0]

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container maxWidth="xl">
      <Box mb={2}>
        <div
          style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
        >
          {todayForecast ? (
            <>
              <p>{data.targetDate}の天気</p>
              <Image
                src={todayForecast.image.url}
                alt={todayForecast.image.title}
                width={todayForecast.image.width}
                height={todayForecast.image.height}
                style={{ marginRight: '1rem' }}
              />
            </>
          ) : (
            <p>天気情報を取得中...</p>
          )}
          <p>暑さ指数：{data.wbgtIndex}</p>
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
  )
}

export default Index
