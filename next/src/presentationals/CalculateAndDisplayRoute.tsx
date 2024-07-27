import type { NextPage } from 'next'
import { useEffect } from 'react'

interface CalculateAndDisplayRouteProps {
  userPos?: { lat: number; lng: number }
  latitude?: number
  longitude?: number
  map: google.maps.Map | null
}

const CalculateAndDisplayRoute: NextPage<CalculateAndDisplayRouteProps> = (
  props,
) => {
  useEffect(() => {
    if (
      !props.map ||
      !props.userPos ||
      props.userPos.lat === undefined ||
      props.userPos.lng === undefined ||
      props.latitude === undefined ||
      props.longitude === undefined
    ) {
      console.log('Early return due to missing props')
      return
    }

    const directionsService = new google.maps.DirectionsService()
    const directionsRenderer = new google.maps.DirectionsRenderer()
    let durationInfoWindow = new google.maps.InfoWindow()

    directionsService.route(
      {
        origin: props.userPos,
        destination: { lat: props.latitude, lng: props.longitude },
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          if (response) {
            directionsRenderer.setDirections(response)

            // ルートの所要時間を取得して表示
            const firstLeg = response.routes[0].legs[0]
            const durationText =
              firstLeg.duration && firstLeg.duration.text
                ? firstLeg.duration.text
                : undefined

            const midPointIndex = Math.floor(
              response.routes[0].overview_path.length / 2,
            )

            const midLatLng = response.routes[0].overview_path[midPointIndex]

            // Google Mapsで詳細を見るためのリンクを作成
            const originParam = `${props.userPos ? props.userPos.lat : undefined},${props.userPos ? props.userPos.lng : undefined}`
            const destinationParam = `${props.latitude},${props.longitude}`
            const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originParam)}&destination=${encodeURIComponent(destinationParam)}&travelmode=walking`

            // InfoWindowを作成し、ルートの中間地点に所要時間とリンクを表示
            durationInfoWindow = new google.maps.InfoWindow({
              content: `<div style="margin-bottom: 12px; text-align:center">
              トイレまで歩いて約 <strong>${durationText}</strong></div>
              <div style="text-align:center">
                <a href="${googleMapsLink}" target="_blank" 
                style="display: inline-block; 
                padding: 10px 10px; 
                background-color: #4BAF51; 
                color: white; 
                font-weight:bold;
                border-radius: 5px; 
                text-decoration: none;">
                GoogleMapで案内する >
                </a>
              </div>`,
              position: midLatLng,
            })
            durationInfoWindow.open(props.map)

            // DirectionsRendererでルートを表示
            //FIX ここに何か警告の原因がある
            directionsRenderer.setMap(props.map)
          }
        } else {
          console.error('Directions request failed due to ' + status)
        }
      },
    )

    return () => {
      console.log('Cleanup directionsRenderer')
      if (directionsRenderer) {
        //FIX ここに何か警告の原因がある
        directionsRenderer.setMap(null)
      }
      durationInfoWindow.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userPos, props.latitude, props.longitude, props.map])

  // プロパティがすべて設定されるまでコンポーネントをレンダリングしない
  if (
    !props.map ||
    !props.userPos ||
    props.userPos.lat === undefined ||
    props.userPos.lng === undefined ||
    props.latitude === undefined ||
    // eslint-disable-next-line react/prop-types
    props.longitude === undefined
  ) {
    return null
  }

  return null
}

export default CalculateAndDisplayRoute
