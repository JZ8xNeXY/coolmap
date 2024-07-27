import React, { useState } from 'react'
// import EditRestroomContainer from './EditRestroomContainer'
import { useSessionContext } from '@/context/SessionContext'
import DisplayModalWindow from '@/presentationals/DisplayModalWindow'

interface DisplayModalWindowContainerProps {
  openModalWindow: boolean
  closeModalWindow: () => void
  name: string
  address: string
  latitude: number
  longitude: number
  openingHours: string
  hasWaterServer: boolean
  hasDesk: boolean
  hasChair: boolean
  hasPowerOutlet: boolean
  hasTv: boolean
  capacity: number
  remarks: string
  image: string
}

const DisplayModalWindowContainer: React.FC<
  DisplayModalWindowContainerProps
> = ({
  openModalWindow,
  closeModalWindow,
  name,
  address,
  latitude,
  longitude,
  openingHours,
  hasWaterServer,
  hasDesk,
  hasChair,
  hasPowerOutlet,
  hasTv,
  capacity,
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
      <DisplayModalWindow
        user={currentUser}
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={name}
        address={address}
        latitude={latitude}
        longitude={longitude}
        openingHours={openingHours}
        hasWaterServer={hasWaterServer}
        hasDesk={hasDesk}
        hasChair={hasChair}
        hasPowerOutlet={hasPowerOutlet}
        hasTv={hasTv}
        capacity={capacity}
        remarks={remarks}
        image={image}
        // openEditRestroomModalWindow={openEditRestroomModalWindow}
      />
    </>
  )
}

export default DisplayModalWindowContainer
