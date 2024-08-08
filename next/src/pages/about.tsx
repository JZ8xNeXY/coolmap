import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddMarkersContainer from '@/containers/AddMarkersContainer'
import { CoolingshelterProvider } from '@/context/CoolingshelterContext'
import { WaterserverProvider } from '@/context/WaterserverContext'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}

const About: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  return (
    <Container
      maxWidth="md"
      sx={{ px: { xs: 2, md: 4 }, mt: { xs: 2, md: 4 } }}
    >
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontWeight: 'bold',
            color: '#3f51b5',
            fontSize: { xs: '26px', md: '36px' },
            mb: { xs: 2, md: 3 },
          }}
        >
          涼快あんしんナビ で
        </Typography>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontWeight: 'bold',
            color: '#3f51b5',
            fontSize: { xs: '26px', md: '36px' },
            mb: { xs: 2, md: 3 },
          }}
        ></Typography>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" component="p">
          \ P O I N T /
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} mb={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point1.png"
                  alt="Point 1"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 1 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'left', color: 'black' }}
                >
                  市内の天気について調べる
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} mb={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point2.png"
                  alt="Point 2"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 2 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'left', color: 'black' }}
                >
                  省エネ・再エネ
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} mb={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point3.png"
                  alt="Point 3"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 3 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'left', color: 'black' }}
                >
                  家の中でできる暑さ対策
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} mb={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point3.png"
                  alt="Point 3"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 4 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'left', color: 'black' }}
                >
                  外でできる暑さ対策
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} mb={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point3.png"
                  alt="Point 3"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 5 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'left', color: 'black' }}
                >
                  熱中症かなと思ったら？
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} mb={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point3.png"
                  alt="Point 3"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 6 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'left', color: 'black' }}
                >
                  救急を呼ぶとき
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" component="p">
          \ S E A R C H /
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CoolingshelterProvider>
          <WaterserverProvider>
            <AddMarkersContainer map={map} />
          </WaterserverProvider>
        </CoolingshelterProvider>
        <Box id="map" style={{ height: '80vh', width: '100%' }}></Box>
      </Box> */}
    </Container>
  )
}

export default About
