import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import { supabase } from '../utils/supabase'
import { useCoolingshelterContext } from '@/context/CoolingshelterContext'
import { useWaterserverContext } from '@/context/WaterserverContext'
import AddCoolingsheltersMarkers from '@/presentationals/AddCoolingsheltersMarkers'
import AddWaterserversMarkers from '@/presentationals/AddWaterserversMarkers'
import { userGeoLocation } from '@/utils/userGeoLocation'

interface AddMarkersProps {
  map: google.maps.Map | null
}

interface Coolingshelter {
  id: number
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

interface Waterserver {
  id: number
  name: string
  address: string
  place: string
  latitude: number
  longitude: number
  spoutType: boolean
  bottleDispenserType: boolean
  image: string
}

const AddMarkersContainer: NextPage<AddMarkersProps> = ({ map }) => {
  const fetchCoolingshelters = async () => {
    const { data, error } = await supabase.from('coolingshelters').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  const fetchWaterservers = async () => {
    const { data, error } = await supabase.from('waterservers').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  const { data: coolingsheltersData, error: coolingsheltersError } = useSWR(
    'fetchCoolingshelters',
    fetchCoolingshelters,
    {
      revalidateOnFocus: false,
    },
  )

  const { data: waterserversData, error: waterserversError } = useSWR(
    'fetchWaterservers',
    fetchWaterservers,
    {
      revalidateOnFocus: false,
    },
  )

  const { selectedCoolingshelter, setSelectedCoolingshelter } =
    useCoolingshelterContext()
  const { selectedWaterserver, setSelectedWaterserver } =
    useWaterserverContext()

  const [openCoolingshelterModal, setOpenCoolingshelterModal] = useState(false)
  const closeCoolingshelterModal = () => setOpenCoolingshelterModal(false)

  const [openWaterserverModal, setOpenWaterserverModal] = useState(false)
  const closeWaterserverModal = () => setOpenWaterserverModal(false)

  const [currentUserPos, setCurrentUserPos] = useState<{
    lat: number
    lng: number
  }>()

  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])

  useEffect(() => {
    if (map) {
      userGeoLocation({ map, setCurrentUserPos })
    }
  }, [map])

  useEffect(() => {
    const addMarkers = async () => {
      if (map && coolingsheltersData && waterserversData) {
        markersRef.current.forEach((marker) => (marker.map = null))
        markersRef.current = []

        const waterservers: Waterserver[] = waterserversData
          ? camelcaseKeys(waterserversData)
          : []

        const coolingshelters: Coolingshelter[] = coolingsheltersData
          ? camelcaseKeys(coolingsheltersData)
          : []

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        waterservers.forEach((waterserver) => {
          const waterserverImg = document.createElement('img')
          waterserverImg.src = '/waterserver.png'
          waterserverImg.alt = waterserver.name
          waterserverImg.width = 60
          waterserverImg.height = 75
          waterserverImg.style.zIndex = '5'

          const waterserverMarker = new AdvancedMarkerElement({
            map,
            position: {
              lat: waterserver.latitude,
              lng: waterserver.longitude,
            },
            title: waterserver.name,
            content: waterserverImg,
          })

          waterserverMarker.addListener('gmp-click', function () {
            setOpenWaterserverModal(true)
            setSelectedWaterserver({
              id: waterserver.id,
              name: waterserver.name,
              address: waterserver.address,
              place: waterserver.place,
              latitude: waterserver.latitude,
              longitude: waterserver.longitude,
              spoutType: waterserver.spoutType,
              bottleDispenserType: waterserver.bottleDispenserType,
              image: waterserver.image,
            })
          })

          markersRef.current.push(waterserverMarker)
        })

        coolingshelters.forEach((coolingshelter) => {
          const coolingshelterImg = document.createElement('img')
          coolingshelterImg.src = '/coolingshelter.png'
          coolingshelterImg.alt = coolingshelter.name
          coolingshelterImg.width = 75
          coolingshelterImg.height = 75
          coolingshelterImg.style.zIndex = '10'

          const coolingshelterMarker = new AdvancedMarkerElement({
            map,
            position: {
              lat: coolingshelter.latitude,
              lng: coolingshelter.longitude,
            },
            title: coolingshelter.name,
            content: coolingshelterImg,
          })

          coolingshelterMarker.addListener('gmp-click', function () {
            setOpenCoolingshelterModal(true)
            setSelectedCoolingshelter({
              id: coolingshelter.id,
              name: coolingshelter.name,
              address: coolingshelter.address,
              latitude: coolingshelter.latitude,
              longitude: coolingshelter.longitude,
              tel: coolingshelter.tel,
              openingHours: coolingshelter.openingHours,
              closedDays: coolingshelter.closedDays,
              waterCooler: coolingshelter.waterCooler,
              waterServer: coolingshelter.waterServer,
              vendingMachine: coolingshelter.vendingMachine,
              drinkingWaterProvided: coolingshelter.drinkingWaterProvided,
              installationPlanned: coolingshelter.installationPlanned,
              remarks: coolingshelter.remarks,
              image: coolingshelter.image,
            })
          })

          markersRef.current.push(coolingshelterMarker)
        })
      }
    }

    if (map) {
      addMarkers()
    }
  }, [
    map,
    waterserversData,
    coolingsheltersData,
    setSelectedCoolingshelter,
    setSelectedWaterserver,
  ])

  return (
    <>
      <AddCoolingsheltersMarkers
        error={coolingsheltersError}
        data={coolingsheltersData}
        openModalWindow={openCoolingshelterModal}
        closeModalWindow={closeCoolingshelterModal}
        selectedCoolingshelter={selectedCoolingshelter}
        currentUserPos={currentUserPos}
        map={map}
      />
      <AddWaterserversMarkers
        error={waterserversError}
        data={waterserversData}
        openModalWindow={openWaterserverModal}
        closeModalWindow={closeWaterserverModal}
        selectedWaterserver={selectedWaterserver}
        currentUserPos={currentUserPos}
        map={map}
      />
    </>
  )
}

export default AddMarkersContainer
