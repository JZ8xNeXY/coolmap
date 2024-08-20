/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import changeFontSize from '@/styles/changeFontSize'
import { nursingRoomStyle, anyoneToiletStyle } from '@/styles/facilityStyles'
import modalStyle from '@/styles/modalStyles'

interface UserProps {
  email: string
  id: number
  isFetched: boolean
  isSignedIn: boolean
}

interface DisplayWaterserverModalWindowProps {
  user: UserProps
  openModalWindow: boolean
  closeModalWindow: () => void
  name: string
  address: string
  place: string
  latitude: number
  longitude: number
  spoutType?: boolean
  bottleDispenserType?: boolean
  image: string
}

const DisplayWaterserverModalWindow: React.FC<
  DisplayWaterserverModalWindowProps
> = ({
  // user,
  openModalWindow,
  closeModalWindow,
  name,
  address,
  place,
  spoutType,
  bottleDispenserType,
  image,
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
          <img src={image} alt="waterserver" width={200} height={200} />
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
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            住所
          </Typography>
          <Typography sx={{ ml: 2 }}>{address ? address : 'ー'}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            場所
          </Typography>
          <Typography sx={{ ml: 2 }}>{place ? place : 'ー'}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            タイプ
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
              {!spoutType && !bottleDispenserType && (
                <Typography>ー</Typography>
              )}
            </Typography>
            {spoutType && (
              <Typography sx={nursingRoomStyle}>飲み口型水飲栓</Typography>
            )}
            {bottleDispenserType && (
              <Typography sx={anyoneToiletStyle}>
                ボトルディスペンサー型水飲栓
              </Typography>
            )}
          </Box>
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

export default DisplayWaterserverModalWindow
