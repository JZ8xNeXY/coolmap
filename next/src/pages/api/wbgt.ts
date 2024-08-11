import { constants } from 'crypto' // Node.jsのconstantsモジュールをインポート
import https from 'https'
import axios from 'axios'
import * as moment from 'moment-timezone'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  const today = moment.tz('Asia/Tokyo').format('YYYYMMDD')
  const tomorrow = moment.tz('Asia/Tokyo').add(1, 'day').format('YYYYMMDD')

  const AREA_CODE_TOKYO = '44116' // 府中の地点コード
  const AREA_CODE_ALL = 'tokyo' // 東京圏内全体

  try {
    // 東京地点のWBGTデータを取得
    const responseTokyo = await axios.get(
      `https://www.wbgt.env.go.jp/prev15WG/dl/yohou_${AREA_CODE_TOKYO}.csv`,
      {
        responseType: 'arraybuffer',
        httpsAgent,
      },
    )

    const dataTokyo = Buffer.from(responseTokyo.data, 'binary').toString(
      'utf-8',
    )
    const listWbgtTokyo = dataTokyo
      .split('\n')
      .map((line: string) => line.split(','))

    // 東京圏内全体のWBGTデータを取得
    const responseAll = await axios.get(
      `https://www.wbgt.env.go.jp/prev15WG/dl/yohou_${AREA_CODE_ALL}.csv`,
      {
        responseType: 'arraybuffer',
        httpsAgent,
      },
    )

    const dataAll = Buffer.from(responseAll.data, 'binary').toString('utf-8')
    let listWbgtAll = dataAll.split('\n').map((line: string) => line.split(','))

    const tomorrowEndTime = `${tomorrow}24`

    const targetIndices = listWbgtAll[0].reduce(
      (indices: number[], colName: string, index: number) => {
        if (colName <= tomorrowEndTime) {
          indices.push(index)
        }
        return indices
      },
      [],
    )

    listWbgtAll = listWbgtAll.map((row) =>
      targetIndices.map((index) => row[index]),
    )

    const currentHour = moment.tz('Asia/Tokyo').hour()
    let targetTime = ''

    if (currentHour >= 0 && currentHour < 3) {
      targetTime = `${tomorrow}03`
    } else if (currentHour >= 3 && currentHour < 6) {
      targetTime = `${today}06`
    } else if (currentHour >= 6 && currentHour < 9) {
      targetTime = `${today}09`
    } else if (currentHour >= 9 && currentHour < 12) {
      targetTime = `${today}12`
    } else if (currentHour >= 12 && currentHour < 15) {
      targetTime = `${today}15`
    } else if (currentHour >= 15 && currentHour < 18) {
      targetTime = `${today}18`
    } else if (currentHour >= 18 && currentHour < 21) {
      targetTime = `${today}21`
    } else if (currentHour >= 21 && currentHour <= 23) {
      targetTime = `${today}24`
    }

    let targetColumn: number | null = null
    for (let col = 0; col < listWbgtTokyo[0].length; col++) {
      if (listWbgtTokyo[0][col] === targetTime) {
        targetColumn = col
        break
      }
    }

    if (targetColumn === null) {
      throw new Error('適切な時間データが見つかりませんでした')
    }

    let wbgtIndex = 'データ取得エラー'
    let alert = false

    // 府中地点のWBGTインデックスを取得
    for (let i = 1; i < listWbgtTokyo.length; i++) {
      if (listWbgtTokyo[i][0] === AREA_CODE_TOKYO) {
        const wbgt = parseInt(listWbgtTokyo[i][targetColumn], 10)
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

    for (let i = 1; i < listWbgtAll.length; i++) {
      for (let j = 0; j < listWbgtAll[i].length; j++) {
        const wbgt = parseInt(listWbgtAll[i][j], 10)
        if (wbgt >= 33 * 10) {
          // 330 以上
          alert = true
          break
        }
      }
      if (alert) break
    }

    res.status(200).json({ wbgtIndex, alert })
  } catch (error) {
    console.error('CSVデータの取得に失敗しました', error)
    res.status(500).json({ error: 'CSVデータの取得に失敗しました' })
  }
}
