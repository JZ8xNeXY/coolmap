import { Box, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'

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
  height: '400px',
}

const textStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  fontSize: '100pt', // デフォルトのフォントサイズ
  '@media (max-width: 1000px)': {
    fontSize: '60pt', // タブレット用のフォントサイズ
  },
  '@media (max-width: 500px)': {
    fontSize: '36pt', // スマホ用のフォントサイズ
  },
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
}

const IndoorCoolingTips: NextPage = () => {
  return (
    <Container
      maxWidth="lg" // デスクトップでの横幅を広げるためにlgに設定
      sx={{ px: { xs: 2, md: 4 }, mt: { xs: 4, md: 6 } }}
    >
      {/* バナー */}
      <Box sx={bannerStyle}>
        <Typography sx={textStyle}>
          <span style={{ color: 'yellow' }}>公開準備中</span>
        </Typography>
      </Box>
      <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>
        現在ページの準備を進めています。
      </Typography>
      <Typography sx={{ textAlign: 'center', fontSize: '20px', mb: '20px' }}>
        今しばらくお待ちください。
      </Typography>
    </Container>
  )
}

export default IndoorCoolingTips
