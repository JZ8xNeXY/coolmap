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

  return (
    <>
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
      />
    </>
  )
}

export default DisplayCoolingshelterModalWindowContainer
