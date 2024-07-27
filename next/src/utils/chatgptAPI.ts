import axios from 'axios'

const API_URL = 'https://api.openai.com/v1/'
const MODEL = 'gpt-4o-mini'
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

// 画像をそのまま送れないので画像をBase64エンコード（テキストに変換）する関数
export const encodeImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64data = (reader.result as string).split(',')[1] // "data:image/jpeg;base64," の部分を除去
      resolve(base64data)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const chatgpt = async (imageBase64: string) => {
  try {
    const response = await axios.post(
      `${API_URL}chat/completions`,
      {
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are an AI trained to evaluate the cleanliness of toilets based on images. Evaluate the cleanliness of a toilet very strictly on a scale of 0 to 5 from the provided image. If it is not a toilet, answer with 0. No explanation is needed. Answer with a single digit from 0 to 5. Example: 0, 1, 2, 3, 4, 5.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'This is an app to rate the cleanliness of a toilet based on photos on a five-point scale.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                  detail: 'low', // 解像度を指定（low、high、autoのいずれか）今のところlowでも精度高い
                },
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    )
    return response.data.choices[0].message.content
  } catch (error) {
    console.error(error)
    return null
  }
}
