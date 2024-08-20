// import DownloadIcon from '@mui/icons-material/Download'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Link,
  Card,
  CardMedia,
} from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddMarkersContainer from '@/containers/AddMarkersContainer'
import { CoolingshelterProvider } from '@/context/CoolingshelterContext'
import { SessionProvider } from '@/context/SessionContext'
import { WaterserverProvider } from '@/context/WaterserverContext'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'
import { userGeoLocation } from '@/utils/userGeoLocation'
import { getWeatherData } from '@/utils/weather'

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(100, 149, 237, 0.2)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(100, 149, 237, 0.3)',
  },
  borderRadius: '8px',
  padding: '16px',
  backgroundColor: '#f0f8ff',
}

const linkStyle = {
  textDecoration: 'none',
  color: '#1e90ff',
}

const OutdoorCoolingTips: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setWeather] = useState<any>(null)
  const [data, setData] = useState({ wbgtIndex: null, alert: null })
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
      userGeoLocation({ map, setCurrentUserPos: () => {} })
    }
  }, [map])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: '2rem',
        background: '',
        color: '#e0f2f1',
        minHeight: '100vh',
      }}
    >
      <Box mt={4} sx={{ textAlign: 'center' }}>
        <Box mb={2}>
          <Paper
            elevation={3}
            sx={{
              display: 'inline-block',
              padding: '1rem 1rem',
              backgroundColor: '#ff7043',
              color: '#ffffff',
              borderRadius: '1rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
            }}
          >
            <WarningIcon
              sx={{
                fontSize: 40,
                verticalAlign: 'middle',
                marginRight: '0.5rem',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }, // レスポンシブ対応
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              暑さ指数：{data.wbgtIndex}
            </Typography>
          </Paper>
        </Box>

        {data.alert == true && (
          <Box mt={2}>
            <Paper
              elevation={3}
              sx={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '1rem 0.65rem',
                backgroundColor: '#800080', // 背景色をダークパープルに変更
                color: '#ffffff', // テキストを白に
                borderRadius: '1rem',
                fontWeight: 'bold',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              <WarningIcon
                sx={{
                  fontSize: 40,
                  verticalAlign: 'middle',
                  marginRight: '0.5rem',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              >
                熱中症警戒アラート発表中
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
      <Box sx={{ mb: '4', textAlign: 'center' }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '100px',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
            fontSize: { xs: '2rem', sm: '2rem', md: '3rem' },
          }}
        >
          外でできる暑さ対策
        </Typography>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link
              href="https://tenki.jp/forecast/3/16/4410/13204/3hours.html#google_vignette"
              sx={linkStyle}
            >
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/adaptation1.png"
                    alt="Point 1"
                    width={300}
                    height={375}
                  />
                </CardMedia>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link href="/" sx={linkStyle}>
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/adaptation2.png"
                    alt="Point 2"
                    width={300}
                    height={375}
                  />
                </CardMedia>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link href="/" sx={linkStyle}>
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/adaptation3.png"
                    alt="Point 3"
                    width={300}
                    height={375}
                  />
                </CardMedia>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link
              href="https://tenki.jp/forecast/3/16/4410/13204/3hours.html#google_vignette"
              sx={linkStyle}
            >
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/adaptation4.png"
                    alt="Point 1"
                    width={300}
                    height={375}
                  />
                </CardMedia>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link href="/" sx={linkStyle}>
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/adaptation5.png"
                    alt="Point 2"
                    width={300}
                    height={375}
                  />
                </CardMedia>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link href="/" sx={linkStyle}>
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/adaptation6.png"
                    alt="Point 3"
                    width={300}
                    height={375}
                  />
                </CardMedia>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: '4', textAlign: 'center' }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '100px',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
            fontSize: { xs: '2rem', sm: '2em', md: '3rem' },
          }}
        >
          休憩所情報
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '10px',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
            fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2.0rem' },
          }}
        >
          休憩所として市内の公共施設にお立ち寄りください
        </Typography>
      </Box>
      <SessionProvider>
        <CoolingshelterProvider>
          <WaterserverProvider>
            <AddMarkersContainer map={map} />
          </WaterserverProvider>
        </CoolingshelterProvider>
      </SessionProvider>
      <Box
        id="map"
        sx={{
          height: '80vh',
          width: '100%',
          marginTop: '2rem',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          color: 'black',
          fontSize: '3rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: { xs: '0.25rem', sm: '1rem', md: '1rem' },
          }}
        >
          <Box
            sx={{
              width: { xs: 45, sm: 55, md: 80 }, // レスポンシブ対応の幅
              height: { xs: 45, sm: 55, md: 80 }, // レスポンシブ対応の高さ
              position: 'relative', // レスポンシブImageのために必要
            }}
          >
            <Image
              src="/userposition.png"
              alt="ウォーターサーバー"
              layout="fill" // 親ボックスに合わせて画像をリサイズ
              objectFit="contain" // 画像のアスペクト比を保ちながらリサイズ
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem' },
            }}
          >
            現在地
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: { xs: '0.25rem', sm: '1rem', md: '1rem' },
          }}
        >
          <Box
            sx={{
              width: { xs: 40, sm: 50, md: 75 }, // レスポンシブ対応の幅
              height: { xs: 40, sm: 50, md: 75 }, // レスポンシブ対応の高さ
              position: 'relative', // レスポンシブImageのために必要
            }}
          >
            <Image
              src="/coolingshelter.png"
              alt="ウォーターサーバー"
              layout="fill" // 親ボックスに合わせて画像をリサイズ
              objectFit="contain" // 画像のアスペクト比を保ちながらリサイズ
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem' },
            }}
          >
            休憩所
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: { xs: '0.25rem', sm: '1rem', md: '1rem' },
          }}
        >
          <Box
            sx={{
              width: { xs: 40, sm: 50, md: 75 }, // レスポンシブ対応の幅
              height: { xs: 40, sm: 50, md: 75 }, // レスポンシブ対応の高さ
              position: 'relative', // レスポンシブImageのために必要
            }}
          >
            <Image
              src="/waterserver.png"
              alt="ウォーターサーバー"
              layout="fill" // 親ボックスに合わせて画像をリサイズ
              objectFit="contain" // 画像のアスペクト比を保ちながらリサイズ
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.65rem', sm: '1rem', md: '1.25rem' },
            }}
          >
            ウォーターサーバー
          </Typography>
        </Box>

        {/* 他のアイコンの説明もここに追加 */}
      </Box>
    </Container>
  )
}

export default OutdoorCoolingTips
