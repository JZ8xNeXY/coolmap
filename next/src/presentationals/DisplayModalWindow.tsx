/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
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
  latitude: number
  longitude: number
  openingHours: string
  hasWaterServer?: boolean
  hasDesk?: boolean
  hasChair?: boolean
  hasPowerOutlet?: boolean
  hasTv?: boolean
  capacity: number
  remarks: string
  image: string
  openEditCoolingshelterModalWindow: () => void
}

const DisplayModalWindow: React.FC<DisplayModalWindowProps> = ({
  user,
  openModalWindow,
  closeModalWindow,
  name,
  address,
  openingHours,
  hasWaterServer,
  hasDesk,
  hasChair,
  hasPowerOutlet,
  hasTv,
  capacity,
  remarks,
  image,
  // openEditCoolingshelterModalWindow,
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
          <img src={image} alt="coolingshelter" width={200} height={200} />
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
        {/* {user &&
          (user ? (
            <Box sx={{ display: 'flex', justifyContent: 'right', mt: 0 }}>
              <Button
                sx={buttonStyle}
                onClick={() => {
                  closeModalWindow()
                  openEditCoolingshelterModalWindow()
                }}
              >
                編集する
              </Button>
            </Box>
          ) : null)} */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            住所
          </Typography>
          <Typography sx={{ ml: 2 }}>{address ? address : 'ー'}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            開館時間
          </Typography>
          <Typography sx={{ ml: 2 }}>
            {openingHours ? openingHours : 'ー'}
          </Typography>
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
              {!hasWaterServer &&
                !hasDesk &&
                !hasChair &&
                !hasPowerOutlet &&
                !hasTv && <Typography>ー</Typography>}
            </Typography>
            {hasWaterServer && (
              <Typography sx={nursingRoomStyle}>ウォーターサーバー</Typography>
            )}
            {hasDesk && <Typography sx={anyoneToiletStyle}>机</Typography>}
            {hasChair && (
              <Typography sx={diaperChangingStationStyle}>椅子</Typography>
            )}
            {hasPowerOutlet && (
              <Typography sx={powderCornerStyle}>電源</Typography>
            )}
            {hasTv && (
              <Typography sx={strollerAccessibleStyle}>テレビ</Typography>
            )}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            受入可能人数
          </Typography>
          <Typography sx={{ ml: 2 }}>{capacity ? capacity : 'ー'}人</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            備考
          </Typography>
          <Typography sx={{ ml: 2 }}>{remarks ? remarks : 'ー'}</Typography>
        </Box>
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
