/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
// import buttonStyle from '@/styles/buttonStyle'
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

interface DisplayCoolingshelterModalWindowProps {
  user: UserProps
  openModalWindow: boolean
  closeModalWindow: () => void
  name: string
  address: string
  latitude: number
  longitude: number
  tel: string
  openingHours: string
  closedDays: string
  waterCooler: boolean
  waterServer: boolean
  vendingMachine: boolean
  drinkingWaterProvided: boolean
  installationPlanned: boolean
  remarks: string
  image: string
  // openEditCoolingshelterModalWindow: () => void
}

const DisplayCoolingshelterModalWindow: React.FC<
  DisplayCoolingshelterModalWindowProps
> = ({
  // user,
  openModalWindow,
  closeModalWindow,
  name,
  address,
  tel,
  openingHours,
  closedDays,
  waterCooler,
  waterServer,
  vendingMachine,
  drinkingWaterProvided,
  installationPlanned,
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
            所在地
          </Typography>
          <Typography sx={{ ml: 2 }}>{address ? address : 'ー'}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            連絡先
          </Typography>
          <Typography sx={{ ml: 2 }}>{tel ? tel : 'ー'}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            開館日時
          </Typography>
          <Typography sx={{ ml: 2 }}>
            {openingHours ? openingHours : 'ー'}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            休館日
          </Typography>
          <Typography sx={{ ml: 2 }}>
            {closedDays ? closedDays : 'ー'}
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
              {!waterCooler &&
                !waterServer &&
                !vendingMachine &&
                !vendingMachine &&
                !drinkingWaterProvided &&
                !installationPlanned && <Typography>ー</Typography>}
            </Typography>
            {waterCooler && (
              <Typography sx={nursingRoomStyle}>冷水器</Typography>
            )}
            {waterServer && (
              <Typography sx={anyoneToiletStyle}>ウォーターサーバー</Typography>
            )}
            {vendingMachine && (
              <Typography sx={diaperChangingStationStyle}>
                自動販売機あり
              </Typography>
            )}
            {drinkingWaterProvided && (
              <Typography sx={powderCornerStyle}>飲料水の提供</Typography>
            )}
            {installationPlanned && (
              <Typography sx={strollerAccessibleStyle}>設置予定</Typography>
            )}
          </Box>
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

export default DisplayCoolingshelterModalWindow
