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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weather, setWeather] = useState<any>(null)
  const [data, setData] = useState({ wbgtIndex: null, targetDate: null })

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

  const todayForecast = weather?.forecasts[0]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/wbgt')
        setData(response.data)
      } catch (error) {
        console.error('データ取得に失敗しました', error)
      }
    }

    fetchData()
  }, [])

  if (data.wbgtIndex === null) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {todayForecast ? (
              <>
                <p>{data.targetDate}の天気</p>
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
    </>
  )
}

export default Index
