import axios from 'axios'
import { useEffect, useState } from 'react'

const WbgtComponent = () => {
  const [wbgtIndex, setWbgtIndex] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/wbgt')
        setWbgtIndex(response.data.wbgtIndex)
      } catch (error) {
        console.error('データ取得に失敗しました', error)
        setWbgtIndex('データ取得エラー')
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>今日のWBGT指数: {wbgtIndex}</h1>
    </div>
  )
}

export default WbgtComponent
