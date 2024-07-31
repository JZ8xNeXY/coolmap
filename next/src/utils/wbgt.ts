import * as moment from 'moment-timezone'

export const getWbgtIndex = async (): Promise<string> => {
  const today = moment.tz('Asia/Tokyo').format('YYYYMMDD')
  const tomorrow = moment.tz('Asia/Tokyo').add(1, 'day').format('YYYYMMDD')

  const AREA_CODE = '44132' // 東京の地点コード

  try {
    const response = await fetch(
      `https://www.wbgt.env.go.jp/prev15WG/dl/yohou_${AREA_CODE}.csv`,
      {
        headers: {
          'Content-Type': 'text/csv',
          Accept: 'text/csv',
        },
      },
    )

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText)
    }

    const data = response.data
    const listWbgt = data.split('\n').map((line: string) => line.split(','))

    // 動作したのが12時以前なら今日の12時、12時以後なら明日の12時の暑さ指数を取得
    const currentHour = moment.tz('Asia/Tokyo').hour()
    const targetTime = currentHour < 12 ? `${today}12` : `${tomorrow}12`

    let targetRow: number | null = null
    for (let row = 0; row < listWbgt[0].length; row++) {
      if (listWbgt[0][row] === targetTime) {
        targetRow = row
        break
      }
    }

    if (targetRow === null) {
      throw new Error('適切な時間データが見つかりませんでした')
    }

    console.log('ターゲット行:', targetRow)

    // 暑さ指数を温度基準に変換して出力
    for (let i = 0; i < listWbgt.length; i++) {
      if (listWbgt[i][0] === AREA_CODE) {
        const wbgt = parseInt(listWbgt[i][targetRow], 10)
        console.log('WBGT値:', wbgt)
        if (wbgt < 21 * 10) {
          return 'ほぼ安全'
        } else if (wbgt < 25 * 10) {
          return '注意'
        } else if (wbgt < 28 * 10) {
          return '警戒'
        } else if (wbgt < 31 * 10) {
          return '厳重警戒'
        } else {
          return '危険'
        }
      }
    }
    throw new Error('地点コードに一致するデータが見つかりませんでした')
  } catch (error) {
    console.error('天気データの取得に失敗しました', error)
    return 'データ取得エラー'
  }
}
