/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import ReactStarsRating from 'react-awesome-stars-rating'
import buttonStyle from '@/styles/buttonStyle'
import changeFontSize from '@/styles/changeFontSize'
import {
  nursingRoomStyle,
  anyoneToiletStyle,
  diaperChangingStationStyle,
  powderCornerStyle,
  strollerAccessibleStyle,
} from '@/styles/facilityStyles'
import modalStyle from '@/styles/modalStyles'

interface UserProps {
  email: string
  id: number
  isFetched: boolean
  isSignedIn: boolean
}

interface DisplayModalWindowProps {
  user: UserProps
  openModalWindow: boolean
  closeModalWindow: () => void
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  nursingRoom?: boolean
  anyoneToilet?: boolean
  diaperChangingStation?: boolean
  powderCorner?: boolean
  strollerAccessible?: boolean
  evaluation: number
  image: string
  openEditRestroomModalWindow: () => void
}

const DisplayModalWindow: React.FC<DisplayModalWindowProps> = ({
  user,
  openModalWindow,
  closeModalWindow,
  name,
  address,
  content,
  nursingRoom,
  anyoneToilet,
  diaperChangingStation,
  powderCorner,
  strollerAccessible,
  evaluation,
  image,
  openEditRestroomModalWindow,
}) => {
  return (
    <Modal
      open={openModalWindow}
      onClose={closeModalWindow}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button sx={{ color: '#000000' }} onClick={closeModalWindow}>
            <CloseIcon />
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            '& img': {
              width: '100%',
              height: 'auto',
            },
          }}
        >
          <img src={image} alt="restroom" width={200} height={200} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            bgcolor: '#F0F0F0',
            alignItems: 'center',
            borderRadius: '5px',
            p: 1,
            mt: 2,
          }}
        >
          <Typography sx={{ ...changeFontSize(name) }}>
            {name ? name : 'ー'}
          </Typography>
        </Box>
        {user &&
          (user ? (
            <Box sx={{ display: 'flex', justifyContent: 'right', mt: 0 }}>
              <Button
                sx={buttonStyle}
                onClick={() => {
                  closeModalWindow()
                  openEditRestroomModalWindow()
                }}
              >
                編集する
              </Button>
            </Box>
          ) : null)}
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            住所
          </Typography>
          <Typography sx={{ ml: 2 }}>{address ? address : 'ー'}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            コメント
          </Typography>
          <Typography sx={{ ml: 2 }}>{content ? content : 'ー'}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            設備情報
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            <Typography sx={{ ml: 2 }}>
              {!nursingRoom &&
                !anyoneToilet &&
                !diaperChangingStation &&
                !powderCorner &&
                !strollerAccessible && <Typography>ー</Typography>}
            </Typography>
            {nursingRoom && (
              <Typography sx={nursingRoomStyle}>授乳室</Typography>
            )}
            {anyoneToilet && (
              <Typography sx={anyoneToiletStyle}>誰でもトイレ</Typography>
            )}
            {diaperChangingStation && (
              <Typography sx={diaperChangingStationStyle}>
                オムツ交換台
              </Typography>
            )}
            {powderCorner && (
              <Typography sx={powderCornerStyle}>パウダーコーナー</Typography>
            )}
            {strollerAccessible && (
              <Typography sx={strollerAccessibleStyle}>ベビーカー可</Typography>
            )}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            清潔度
          </Typography>
          {/* <Typography sx={{ ml: 2 }}>評価:{evaluation}</Typography> */}
          <Box sx={{ ml: 2 }}>
            <ReactStarsRating isEdit={false} value={evaluation} />
          </Box>
        </Box>
        {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={buttonStyle} onClick={closeModalWindow}>
            評価する
          </Button>
        </Box> */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            href="https://docs.google.com/forms/d/e/1FAIpQLSekveKygTBRldu2AcRV97sUq5RXS7K4qq_k0DLKuT_Skcv48g/viewform"
            target="_blank"
            sx={{ color: 'white', textTransform: 'none' }}
          >
            お問い合わせはこちら ＞
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DisplayModalWindow
