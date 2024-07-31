// import React, { useState } from 'react'
// import EditRestroomContainer from './EditRestroomContainer'
import { useSessionContext } from '@/context/SessionContext'
import DisplayWaterserverModalWindow from '@/presentationals/DisplayWaterserverModalWindow'

interface DisplayWaterserverModalWindowContainerProps {
  openModalWindow: boolean
  closeModalWindow: () => void
  name: string
  address: string
  place: string
  latitude: number
  longitude: number
  spoutType: boolean
  bottleDispenserType: boolean
  image: string
}

const DisplayWaterserverModalWindowContainer: React.FC<
  DisplayWaterserverModalWindowContainerProps
> = ({
  openModalWindow,
  closeModalWindow,
  name,
  address,
  place,
  latitude,
  longitude,
  spoutType,
  bottleDispenserType,
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
      <DisplayWaterserverModalWindow
        user={currentUser}
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={name}
        address={address}
        place={place}
        latitude={latitude}
        longitude={longitude}
        spoutType={spoutType}
        bottleDispenserType={bottleDispenserType}
        image={image}
        // openEditRestroomModalWindow={openEditRestroomModalWindow}
      />
    </>
  )
}

export default DisplayWaterserverModalWindowContainer
