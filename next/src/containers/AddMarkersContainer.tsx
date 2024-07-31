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

  const [openModalWindow, setOpenModalWindow] = useState(false)
  const closeModalWindow = () => setOpenModalWindow(false)

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

        const coolingshelters: Coolingshelter[] = coolingsheltersData
          ? camelcaseKeys(coolingsheltersData)
          : []
        const waterservers: Waterserver[] = waterserversData
          ? camelcaseKeys(waterserversData)
          : []

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        coolingshelters.forEach((coolingshelter) => {
          const coolingshelterImg = document.createElement('img')
          coolingshelterImg.src = '/coolingshelter.png'
          coolingshelterImg.alt = coolingshelter.name
          coolingshelterImg.width = 75
          coolingshelterImg.height = 75

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
            setOpenModalWindow(true)
            setSelectedCoolingshelter({
              id: coolingshelter.id,
              name: coolingshelter.name,
              address: coolingshelter.address,
              latitude: coolingshelter.latitude,
              longitude: coolingshelter.longitude,
              openingHours: coolingshelter.openingHours,
              hasWaterServer: coolingshelter.hasWaterServer,
              hasDesk: coolingshelter.hasDesk,
              hasChair: coolingshelter.hasChair,
              hasPowerOutlet: coolingshelter.hasPowerOutlet,
              hasTv: coolingshelter.hasTv,
              capacity: coolingshelter.capacity,
              remarks: coolingshelter.remarks,
              image: coolingshelter.image,
            })
          })

          markersRef.current.push(coolingshelterMarker)
        })

        waterservers.forEach((waterserver) => {
          const waterserverImg = document.createElement('img')
          waterserverImg.src = '/waterserver.png'
          waterserverImg.alt = waterserver.name
          waterserverImg.width = 75
          waterserverImg.height = 75

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
            setOpenModalWindow(true)
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
      }
    }

    if (map) {
      addMarkers()
    }
  }, [
    map,
    coolingsheltersData,
    waterserversData,
    setSelectedCoolingshelter,
    setSelectedWaterserver,
  ])

  return (
    <>
      <AddCoolingsheltersMarkers
        error={coolingsheltersError}
        data={coolingsheltersData}
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        selectedCoolingshelter={selectedCoolingshelter}
        currentUserPos={currentUserPos}
        map={map}
      />
      <AddWaterserversMarkers
        error={waterserversError}
        data={waterserversData}
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        selectedWaterserver={selectedWaterserver}
        currentUserPos={currentUserPos}
        map={map}
      />
    </>
  )
}

export default AddMarkersContainer
