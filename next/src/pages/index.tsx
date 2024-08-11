import WarningIcon from '@mui/icons-material/Warning'
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  Link,
  CardMedia,
  CardContent,
  Paper,
} from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
// import { getWeatherData } from '@/utils/weather'

const bannerStyle = {
  backgroundImage: 'url(/banner.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: '60px 20px',
  textAlign: 'center',
  borderRadius: '8px',
  marginBottom: '30px',
  position: 'relative',
  height: '400px', // バナーの高さを設定
}

const descriptionStyle = {
  color: 'black',
  fontSize: { xs: '24px', md: '24px' },
  lineHeight: '1.8',
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
}

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

const actionButtonStyle = {
  marginTop: '16px',
  padding: '8px 16px',
  backgroundColor: '#1e90ff',
  color: 'white',
  borderRadius: '4px',
  textDecoration: 'none',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#4682b4',
  },
}

const Index: NextPage = () => {
  const [data, setData] = useState({ wbgtIndex: null, targetDate: null })

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

  return (
    <Container
      maxWidth="lg" // デスクトップでの横幅を広げるためにlgに設定
      sx={{ px: { xs: 2, md: 4 }, mt: { xs: 4, md: 6 } }}
    >
      {/* バナー */}
      <Box sx={bannerStyle}></Box>

      <Box mt={4} sx={{ textAlign: 'center' }}>
        <Box mb={2}>
          <Paper
            elevation={3}
            sx={{
              display: 'inline-block',
              padding: '1rem 2rem',
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
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              暑さ指数：{data.wbgtIndex}
            </Typography>
          </Paper>
        </Box>

        {data.wbgtIndex === '危険 熱中症の危険性が高まっています' && (
          <Box mt={2}>
            <Paper
              elevation={3}
              sx={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '1rem 2rem',
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
                variant="h5"
                sx={{
                  fontWeight: 'bold',
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

      {/* タイトルと説明文 */}
      <Box sx={{ padding: '30px 0' }}>
        <Typography variant="body1" sx={descriptionStyle}>
          熱中症から身を守るため、万全の準備を。
        </Typography>
        <Typography variant="body1" sx={descriptionStyle}>
          最新の気象情報と効果的な暑さ対策をお届けします。
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
                    src="/weather.png"
                    alt="Point 1"
                    width={300}
                    height={300}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      textAlign: 'center',
                      mb: 1.5,
                      color: '#3f51b5',
                      fontSize: { xs: '16px', md: '18px' },
                    }}
                  >
                    市内の気象情報
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      textAlign: 'left',
                      color: 'black',
                      fontSize: { xs: '12px', md: '14px' },
                      lineHeight: '1.5',
                    }}
                  >
                    現在の気温や湿度、熱中症警戒情報を表示
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button sx={actionButtonStyle}>詳細を見る</Button>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link href="/" sx={linkStyle}>
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/indoorCoolingTips.png"
                    alt="Point 2"
                    width={300}
                    height={300}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      textAlign: 'center',
                      mb: 1.5,
                      color: '#3f51b5',
                      fontSize: { xs: '16px', md: '18px' },
                    }}
                  >
                    家の中でできる暑さ対策
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      textAlign: 'left',
                      color: 'black',
                      fontSize: { xs: '12px', md: '14px' },
                      lineHeight: '1.5',
                    }}
                  >
                    断熱や省エネエアコン導入のヒントを提供
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button sx={actionButtonStyle}>詳細を見る</Button>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link href="/outdoorcoolingtips" sx={linkStyle}>
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/outdoorCoolingTips.png"
                    alt="Point 3"
                    width={300}
                    height={300}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      textAlign: 'center',
                      mb: 1.5,
                      color: '#3f51b5',
                      fontSize: { xs: '16px', md: '18px' },
                    }}
                  >
                    外でできる暑さ対策
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      textAlign: 'left',
                      color: 'black',
                      fontSize: { xs: '12px', md: '14px' },
                      lineHeight: '1.5',
                    }}
                  >
                    外で涼しく過ごす工夫や涼みどころを紹介
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button sx={actionButtonStyle}>詳細を見る</Button>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link href="/" sx={linkStyle}>
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/selfcheck.png"
                    alt="Point 3"
                    width={300}
                    height={300}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      textAlign: 'center',
                      mb: 1.5,
                      color: '#3f51b5',
                      fontSize: { xs: '16px', md: '18px' },
                    }}
                  >
                    熱中症セルフチェック
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      textAlign: 'left',
                      color: 'black',
                      fontSize: { xs: '12px', md: '14px' },
                      lineHeight: '1.5',
                    }}
                  >
                    初期症状を早期発見するためのセルフチェック
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button sx={actionButtonStyle}>詳細を見る</Button>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link href="/" sx={linkStyle}>
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/firstAid.png"
                    alt="Point 3"
                    width={300}
                    height={300}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      textAlign: 'center',
                      mb: 1.5,
                      color: '#3f51b5',
                      fontSize: { xs: '16px', md: '18px' },
                    }}
                  >
                    応急処置
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      textAlign: 'left',
                      color: 'black',
                      fontSize: { xs: '12px', md: '14px' },
                      lineHeight: '1.5',
                    }}
                  >
                    緊急時の適切な対応方法を提供
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button sx={actionButtonStyle}>詳細を見る</Button>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={4}>
            <Link
              href="https://www.city.mitaka.lg.jp/c_event/109/109935.html"
              sx={linkStyle}
            >
              <Card sx={{ ...cardStyle }}>
                <CardMedia>
                  <Image
                    src="/festival.png"
                    alt="Point 3"
                    width={300}
                    height={300}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      textAlign: 'center',
                      mb: 1.5,
                      color: '#3f51b5',
                      fontSize: { xs: '16px', md: '18px' },
                    }}
                  >
                    イベント情報
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      textAlign: 'left',
                      color: 'black',
                      fontSize: { xs: '12px', md: '14px' },
                      lineHeight: '1.5',
                    }}
                  >
                    暑さ対策に関する各種イベント情報を案内
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button sx={actionButtonStyle}>詳細を見る</Button>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Index
