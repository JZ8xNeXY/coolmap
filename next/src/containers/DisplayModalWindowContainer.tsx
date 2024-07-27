import React, { useState } from 'react'
import EditRestroomContainer from './EditRestroomContainer'
import { useSessionContext } from '@/context/SessionContext'
import DisplayModalWindow from '@/presentationals/DisplayModalWindow'

interface DisplayModalWindowContainerProps {
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
}

const DisplayModalWindowContainer: React.FC<
  DisplayModalWindowContainerProps
> = ({
  openModalWindow,
  closeModalWindow,
  name,
  address,
  content,
  latitude,
  longitude,
  nursingRoom,
  anyoneToilet,
  diaperChangingStation,
  powderCorner,
  strollerAccessible,
  evaluation,
  image,
}) => {
  const { currentUser } = useSessionContext()
  const [editModalWindow, setEditModalWindow] = useState(false)
  const openEditRestroomModalWindow = () => setEditModalWindow(true)
  const closeEditRestroomModalWindow = () => setEditModalWindow(false)

  return (
    <>
      <EditRestroomContainer
        open={editModalWindow}
        onClose={closeEditRestroomModalWindow}
      />
      <DisplayModalWindow
        user={currentUser}
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={name}
        address={address}
        content={content}
        latitude={latitude}
        longitude={longitude}
        nursingRoom={nursingRoom}
        anyoneToilet={anyoneToilet}
        diaperChangingStation={diaperChangingStation}
        powderCorner={powderCorner}
        strollerAccessible={strollerAccessible}
        evaluation={evaluation}
        image={image}
        openEditRestroomModalWindow={openEditRestroomModalWindow}
      />
    </>
  )
}

export default DisplayModalWindowContainer
