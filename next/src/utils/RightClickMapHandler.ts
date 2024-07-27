interface RightClickMapHandlerProps {
  map: google.maps.Map
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>
  setOpenAddRestroomModal: React.Dispatch<React.SetStateAction<boolean>>
  setCoords: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >
}

export const RightClickMapHandler = ({
  map,
  setOpenAddRestroomModal,
  setCoords,
}: RightClickMapHandlerProps) => {
  let currentMarker: google.maps.marker.AdvancedMarkerElement | null = null

  map.addListener('rightclick', (e: google.maps.MapMouseEvent) => {
    const latitude = e.latLng?.lat()
    const longitude = e.latLng?.lng()

    if (latitude !== undefined && longitude !== undefined) {
      setCoords({ lat: latitude, lng: longitude })

      // 既存のマーカーがある場合は削除
      if (currentMarker) {
        currentMarker.map = null
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const pinViewScaled = new google.maps.marker.PinView({
        // ToDo PinViewで型の警告が出るため
        background: '#4CAF50',
        glyphColor: 'white',
      })

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: latitude, lng: longitude },
        map,
        content: pinViewScaled.element,
      })

      // 新しいマーカーを現在のマーカーとしてセット
      currentMarker = marker

      const contentString = `
      <div id="infoWindowContent" style="padding: 15px;">
        <button id="openModalButton" 
                style="background-color: #4CAF50;
                color: white; border: none;
                font-weight:bold;
                padding: 10px 20px;
                border-radius:5px;
                cursor: pointer;">
          ここを登録する >
        </button>
      </div>`

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        position: e.latLng,
      })

      infowindow.open(map, marker)

      google.maps.event.addListenerOnce(infowindow, 'domready', () => {
        document
          .getElementById('openModalButton')
          ?.addEventListener('click', () => {
            setOpenAddRestroomModal(true)
            marker.map = null
            infowindow.close()
            currentMarker = null
          })
      })

      // マーカーをマップから削除
      google.maps.event.addListener(marker, 'click', () => {
        marker.map = null
        currentMarker = null
      })

      return marker
    }
  })
}
