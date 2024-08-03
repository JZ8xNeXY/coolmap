// import React, { useState } from 'react'
// import EditRestroomContainer from './EditRestroomContainer'
import { useSessionContext } from '@/context/SessionContext'
import DisplayCoolingshelterModalWindow from '@/presentationals/DisplayCoolingshelterModalWindow'

interface DisplayCoolingshelterModalWindowContainerProps {
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
}

const DisplayCoolingshelterModalWindowContainer: React.FC<
  DisplayCoolingshelterModalWindowContainerProps
> = ({
  openModalWindow,
  closeModalWindow,
  name,
  address,
  latitude,
  longitude,
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
}) => {
  const { currentUser } = useSessionContext()
  // const [editModalWindow, setEditModalWindow] = useState(false)
  // const openEditRestroomModalWindow = () => setEditModalWindow(true)
  // const closeEditRestroomModalWindow = () => setEditModalWindow(false)

  return (
    <>
      {/* <EditRestroomContainer
        open={editModalWindow}
        onClose={closeEditRestroomModalWindow}
      /> */}
      <DisplayCoolingshelterModalWindow
        user={currentUser}
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={name}
        address={address}
        latitude={latitude}
        longitude={longitude}
        tel={tel}
        openingHours={openingHours}
        closedDays={closedDays}
        waterCooler={waterCooler}
        waterServer={waterServer}
        vendingMachine={vendingMachine}
        drinkingWaterProvided={drinkingWaterProvided}
        installationPlanned={installationPlanned}
        remarks={remarks}
        image={image}
        // openEditRestroomModalWindow={openEditRestroomModalWindow}
      />
    </>
  )
}

export default DisplayCoolingshelterModalWindowContainer
