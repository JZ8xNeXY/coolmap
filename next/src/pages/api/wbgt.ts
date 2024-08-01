import { constants } from 'crypto' // Node.jsのconstantsモジュールをインポート
import https from 'https'
import axios from 'axios'
import * as moment from 'moment-timezone'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT,
})

export default async function handler(req, res) {
  const today = moment.tz('Asia/Tokyo').format('YYYYMMDD')
  const tomorrow = moment.tz('Asia/Tokyo').add(1, 'day').format('YYYYMMDD')

  const AREA_CODE = '44132' // 東京の地点コード

  try {
    const response = await axios.get(
      `https://www.wbgt.env.go.jp/prev15WG/dl/yohou_${AREA_CODE}.csv`,
      {
        responseType: 'arraybuffer',
        httpsAgent,
      },
    )

    const data = Buffer.from(response.data, 'binary').toString('utf-8')
    const listWbgt = data.split('\n').map((line: string) => line.split(','))

    const currentHour = moment.tz('Asia/Tokyo').hour()
    const targetDate = currentHour < 12 ? today : tomorrow
    const targetTime = currentHour < 12 ? `${today}12` : `${tomorrow}12`

    let targetColumn: number | null = null
    for (let col = 0; col < listWbgt[0].length; col++) {
      if (listWbgt[0][col] === targetTime) {
        targetColumn = col
        break
      }
    }

    if (targetColumn === null) {
      throw new Error('適切な時間データが見つかりませんでした')
    }

    let wbgtIndex = 'データ取得エラー'
    for (let i = 1; i < listWbgt.length; i++) {
      // ヘッダー行をスキップするためにi=1から開始
      if (listWbgt[i][0] === AREA_CODE) {
        const wbgt = parseInt(listWbgt[i][targetColumn], 10)
        if (wbgt < 21 * 10) {
          wbgtIndex = 'ほぼ安全'
        } else if (wbgt < 25 * 10) {
          wbgtIndex = '注意'
        } else if (wbgt < 28 * 10) {
          wbgtIndex = '警戒'
        } else if (wbgt < 31 * 10) {
          wbgtIndex = '厳重警戒'
        } else {
          wbgtIndex = '危険'
        }
        break
      }
    }

    res.status(200).json({ wbgtIndex, targetDate })
  } catch (error) {
    console.error('CSVデータの取得に失敗しました', error)
    res.status(500).json({ error: 'CSVデータの取得に失敗しました' })
  }
}
