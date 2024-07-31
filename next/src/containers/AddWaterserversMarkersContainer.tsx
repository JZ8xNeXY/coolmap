import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import { supabase } from '../utils/supabase'
import { usewaterserverContext } from '@/context/waterserverContext'
import AddwaterserversMarkers from '@/presentationals/AddwaterserversMarkers'
import { userGeoLocation } from '@/utils/userGeoLocation'

interface AddWaterserversMarkersProps {
  map: google.maps.Map | null
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

const AddWaterserversMarkersContainer: NextPage<
  AddWaterserversMarkersProps
> = ({ map }) => {
  //supabaseからの読込
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('waterservers').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  const { data, error } = useSWR('fetchPosts', fetchPosts, {
    revalidateOnFocus: false,
  })

  const { selectedWaterserver, setSelectedWaterserver } =
    usewaterserverContext()

  const [openModalWindow, setOpenModalWindow] = useState(false)
  const closeModalWindow = () => setOpenModalWindow(false)

  const [currentUserPos, setCurrentUserPos] = useState<{
    lat: number
    lng: number
  }>()

  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])

  useEffect(() => {
    const FindCurrentLocation = () => {
      if (map) {
        userGeoLocation({ map, setCurrentUserPos })
      }
    }
    if (map) {
      FindCurrentLocation()
    }
  }, [map])

  useEffect(() => {
    const addMarkers = async () => {
      if (map && data) {
        markersRef.current.forEach((marker) => (marker.map = null))
        markersRef.current = []

        const waterservers: Waterserver[] = data ? camelcaseKeys(data) : []

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        waterservers.forEach((waterserver) => {
          const waterserverImg = document.createElement('img')
          waterserverImg.src = '/waterservers.png'
          waterserverImg.alt = waterserver.name
          waterserverImg.width = 75
          waterserverImg.height = 75

          console.log(waterserver)

          const marker = new AdvancedMarkerElement({
            map,
            position: {
              lat: waterserver.latitude,
              lng: waterserver.longitude,
            },
            title: waterserver.name,
            content: waterserverImg,
          })

          console.log(marker)

          marker.addListener('gmp-click', function () {
            setOpenModalWindow(true)
            setSelectedWaterserver({
              id: waterserver.id,
              name: waterserver.name,
              address: waterserver.address,
              latitude: waterserver.latitude,
              longitude: waterserver.longitude,
              openingHours: waterserver.openingHours,
              hasWaterServer: waterserver.hasWaterServer,
              hasDesk: waterserver.hasDesk,
              hasChair: waterserver.hasChair,
              hasPowerOutlet: waterserver.hasPowerOutlet,
              hasTv: waterserver.hasTv,
              capacity: waterserver.capacity,
              remarks: waterserver.remarks,
              image: waterserver.image,
            })
          })

          markersRef.current.push(marker)
        })
      }
    }

    if (map) {
      addMarkers()
    }
  }, [map, data, setSelectedWaterserver])

  return (
    <AddwaterserversMarkers
      error={error}
      data={data}
      openModalWindow={openModalWindow}
      closeModalWindow={closeModalWindow}
      selectedWaterserver={selectedWaterserver}
      currentUserPos={currentUserPos}
      map={map}
    />
  )
}

export default AddWaterserversMarkersContainer
