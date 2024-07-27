import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import { supabase } from '../utils/supabase'
import { useRestroomContext } from '@/context/RestRoomContext'
import AddMarkers from '@/presentationals/AddMarkers'
import { userGeoLocation } from '@/utils/userGeoLocation'

interface AddMarkersProps {
  map: google.maps.Map | null
}

interface Restroom {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  opening_hours: string
  has_water_server: boolean
  has_desk: boolean
  has_chair: boolean
  has_power_outlet: boolean
  has_tv: boolean
  capacity: number
  remarks: string
  image: string
}

const AddMarkersContainer: NextPage<AddMarkersProps> = ({ map }) => {
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

  const { selectedRestroom, setSelectedRestroom } = useRestroomContext()

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

        const restrooms: Restroom[] = data ? camelcaseKeys(data) : []

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        restrooms.forEach((restroom) => {
          const restroomImg = document.createElement('img')
          restroomImg.src = '/restroom.png'
          restroomImg.alt = restroom.name
          restroomImg.width = 75
          restroomImg.height = 75

          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: restroom.latitude, lng: restroom.longitude },
            title: restroom.name,
            content: restroomImg,
          })

          marker.addListener('gmp-click', function () {
            setOpenModalWindow(true)
            setSelectedRestroom({
              id: restroom.id,
              name: restroom.name,
              address: restroom.address,
              content: restroom.content,
              latitude: restroom.latitude,
              longitude: restroom.longitude,
              createdAt: restroom.createdAt,
              nursingRoom: restroom.nursingRoom,
              anyoneToilet: restroom.anyoneToilet,
              diaperChangingStation: restroom.diaperChangingStation,
              powderCorner: restroom.powderCorner,
              strollerAccessible: restroom.strollerAccessible,
              evaluation: restroom.evaluation,
              image: restroom.image,
            })
          })

          markersRef.current.push(marker)
        })
      }
    }

    if (map) {
      addMarkers()
    }
  }, [map, data, setSelectedRestroom])

  return (
    <AddMarkers
      error={error}
      data={data}
      openModalWindow={openModalWindow}
      closeModalWindow={closeModalWindow}
      selectedRestroom={selectedRestroom}
      currentUserPos={currentUserPos}
      map={map}
    />
  )
}

export default AddMarkersContainer
