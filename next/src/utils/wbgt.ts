import axios from 'axios'

export const getWbgtIndex = async (): Promise<string> => {
  const AREA_CODE = '44132' // 東京の地点コード

  try {
    const response = await axios.get(
      `https://www.wbgt.env.go.jp/prev15WG/dl/yohou_${AREA_CODE}.csv`,
      {
        headers: {
          'Content-Type': 'text/csv',
          Accept: 'text/csv',
        },
      },
    )
    console.log(response)
  } catch (error) {
    console.error('天気データの取得に失敗しました', error)
    console.error('エラーメッセージ:', error.message)
    return 'データ取得エラー'
  }
}
