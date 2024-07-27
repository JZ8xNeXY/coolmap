import '../styles/Home.module.css'

interface UserGeoLocationProps {
  map: google.maps.Map | null
  setCurrentUserPos: (pos: { lat: number; lng: number }) => void
}

export const userGeoLocation = ({
  map,
  setCurrentUserPos,
}: UserGeoLocationProps) => {
  // グローバルスコープで userPosImg を定義
  let userPosImg: HTMLImageElement

  //GPS機能で現在地を取得できた場合
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const UserPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        // 現在地のアイコンを作成
        userPosImg = document.createElement('img')
        userPosImg.src = '/userposition.png'
        userPosImg.width = 75
        userPosImg.height = 75
        userPosImg.classList.add('bounce')

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        new AdvancedMarkerElement({
          map,
          position: UserPos,
          title: 'Your Location',
          content: userPosImg,
        })

        setCurrentUserPos(UserPos)

        if (map) {
          map.setCenter(UserPos)
        }
      },
      async () => {
        // GPS機能で現在地を取得できない場合、東京駅の位置を使用
        const tokyoStationPos = { lat: 35.681236, lng: 139.767125 }

        // userPosImg をここでも作成
        userPosImg = document.createElement('img')
        userPosImg.src = '/userposition.png'
        userPosImg.width = 75
        userPosImg.height = 75
        userPosImg.classList.add('bounce')

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        new AdvancedMarkerElement({
          map,
          position: tokyoStationPos,
          title: 'Your Location',
          content: userPosImg,
          zIndex: 1,
        })

        setCurrentUserPos(tokyoStationPos)

        if (map) {
          map.setCenter(tokyoStationPos)
        }
      },
    )
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}
