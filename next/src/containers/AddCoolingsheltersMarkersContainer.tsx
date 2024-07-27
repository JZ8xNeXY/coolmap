import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import { supabase } from '../utils/supabase'
import { useCoolingshelterContext } from '@/context/CoolingshelterContext'
import AddCoolingsheltersMarkers from '@/presentationals/AddCoolingsheltersMarkers'
import { userGeoLocation } from '@/utils/userGeoLocation'

interface AddCoolingsheltersMarkersProps {
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

const AddCoolingsheltersMarkersContainer: NextPage<
  AddCoolingsheltersMarkersProps
> = ({ map }) => {
  //supabaseからの読込
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('coolingshelters').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  const { data, error } = useSWR('fetchPosts', fetchPosts, {
    revalidateOnFocus: false,
  })

  const { selectedCoolingshelter, setSelectedCoolingshelter } =
    useCoolingshelterContext()

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

        const coolingshelters: Coolingshelter[] = data
          ? camelcaseKeys(data)
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

          console.log(coolingshelter)

          const marker = new AdvancedMarkerElement({
            map,
            position: {
              lat: coolingshelter.latitude,
              lng: coolingshelter.longitude,
            },
            title: coolingshelter.name,
            content: coolingshelterImg,
          })

          console.log(marker)

          marker.addListener('gmp-click', function () {
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

          markersRef.current.push(marker)
        })
      }
    }

    if (map) {
      addMarkers()
    }
  }, [map, data, setSelectedCoolingshelter])

  return (
    <AddCoolingsheltersMarkers
      error={error}
      data={data}
      openModalWindow={openModalWindow}
      closeModalWindow={closeModalWindow}
      selectedCoolingshelter={selectedCoolingshelter}
      currentUserPos={currentUserPos}
      map={map}
    />
  )
}

export default AddCoolingsheltersMarkersContainer
