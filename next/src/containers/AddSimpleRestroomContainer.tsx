import AWS from 'aws-sdk'
import loadImage from 'blueimp-load-image'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import { supabase } from '../utils/supabase'
import AddSimpleRestroom from '@/presentationals/AddSimpleRestroom'
import { chatgpt, encodeImageToBase64 } from '@/utils/chatgptAPI'

interface AddSimpleRestroomFormData {
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursing_room: boolean
  anyone_toilet: boolean
  diaper_changing_station: boolean
  powder_corner: boolean
  stroller_accessible: boolean
  evaluation: number
  image?: FileList
}

interface AddSimpleRestroomProps {
  open: boolean
  onClose: () => void
}

interface ExifTagValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  '1'?: string
  '2'?: [number, number, number]
  '3'?: string
  '4'?: [number, number, number]
}

const AddSimpleRestroomContainer: React.FC<AddSimpleRestroomProps> = ({
  open,
  onClose,
}) => {
  const { register, handleSubmit, control, reset, setValue } =
    useForm<AddSimpleRestroomFormData>({
      defaultValues: {
        name: '',
        address: '',
        content: '',
        nursing_room: false,
        anyone_toilet: false,
        diaper_changing_station: false,
        powder_corner: false,
        stroller_accessible: false,
        evaluation: 0,
        latitude: 35.681236,
        longitude: 139.767125,
      },
    })

  const fileInput = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement> //更新可能
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const [imageToiletCleanness, setImageToiletCleanness] = useState<number>(0)
  const [imageLatitude, setImageLatitude] = useState('')
  const [imageLongitude, setImageLongitude] = useState('')
  const [warningImageMessage, setWarningImageMessage] = useState('')
  const [confirmImageMessage, setConfirmMessage] = useState('')
  const [warningCoordMessage, setWarningCoordMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null) //S3のURL

  useEffect(() => {
    setValue('evaluation', imageToiletCleanness)
  }, [imageToiletCleanness, setValue])

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    try {
      showImageFileName(files)
      await onChangeShowExifData(e)
      const isOk = await onChangeEvaluateToiletCleanness(files)
      if (isOk) {
        await onChangeUploadFileToS3(files)
      }
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }

  // ref関数 react-hook-formが管理できるようになる
  const { ref, ...rest } = register('image', { onChange })

  const selectImageFile = () => {
    if (!fileInput.current) return
    fileInput.current.removeAttribute('capture')
    fileInput.current.click()
  }

  const showImageFileName = (files: FileList) => {
    const file = files[0]
    const fileReader = new FileReader()
    setFileName(file.name)
    fileReader.onload = () => {
      setImageData(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  }

  const resetImageFile = () => {
    setFileName('')
    setImageData('')
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const resetModal = () => {
    reset()
    resetImageFile()
    onClose()
  }

  const getExifData = (file: File) => {
    loadImage.parseMetaData(file, (data) => {
      if (data.exif) {
        const allExifData = data.exif as ExifTagValue

        const gpsData = allExifData['34853']
        if (gpsData) {
          // 正しい型の引数を渡す
          const latitude = convertDMSToDD(gpsData[2], gpsData[1])
          setImageLatitude(latitude.toString())
          // 正しい型の引数を渡す
          const longitude = convertDMSToDD(gpsData[4], gpsData[3])
          setImageLongitude(longitude.toString())
          setWarningCoordMessage('')
        } else {
          console.log('No GPS data found')
          setWarningCoordMessage('緯度経度を読み込めません')
        }
      } else {
        console.log('No EXIF data found')
        setWarningCoordMessage('緯度経度を読み込めません')
      }
    })
  }

  const convertDMSToDD = (dmsArray: number[], direction: string) => {
    const [degrees, minutes, seconds] = dmsArray
    let dd = degrees + minutes / 60 + seconds / 3600 //度分秒を十進法に変換 どうして誤差が出る

    // 小数点以下の精度を増やして誤差を減らす
    dd = parseFloat(dd.toFixed(10))

    if (direction === 'S' || direction === 'W') {
      dd *= -1
    }
    return dd
  }

  const onChangeShowExifData = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    await getExifData(file)
  }

  const evaluateToiletCleanness = async (file: File) => {
    setIsLoading(true)
    try {
      const imageBase64 = await encodeImageToBase64(file)
      const result = await chatgpt(imageBase64)
      setIsLoading(false)
      if (result == 0) {
        setWarningImageMessage('トイレの画像をアップロードしてください')
      } else {
        setWarningImageMessage('')
      }
      if (result >= 1) {
        setConfirmMessage('トイレの画像を確認しました')
        setTimeout(() => {
          setConfirmMessage('')
        }, 5000)
        setImageToiletCleanness(result)
        return true
      }
      setImageToiletCleanness(result)
      return false
    } catch (error) {
      setIsLoading(false)
      console.error('Error evaluating toilet cleanness:', error)
      setWarningImageMessage('トイレの清潔度の評価に失敗しました')
      return false
    }
  }

  const onChangeEvaluateToiletCleanness = async (files: FileList) => {
    const file = files[0]
    return await evaluateToiletCleanness(file)
  }

  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  })

  const uploadFileToS3 = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`
    const params = {
      Bucket: 'quickcleanrestroommap',
      Key: fileName,
      Body: file,
      ContentType: file.type,
    }

    try {
      const { Location } = await s3.upload(params).promise()
      setImage(Location) // 画像URLをステートに保存
    } catch (error) {
      console.error('Error uploading file to S3:', error)
      throw new Error('Failed to upload file to S3')
    }
  }

  const onChangeUploadFileToS3 = async (files: FileList) => {
    const file = files[0]
    await uploadFileToS3(file)
  }

  const onSubmit: SubmitHandler<AddSimpleRestroomFormData> = async (data) => {
    if (!fileInput.current?.files || fileInput.current.files.length === 0) {
      setWarningImageMessage('トイレの画像をアップロードしてください')
      return
    }

    const postData = {
      name: data.name,
      address: data.address,
      content: data.content,
      latitude: imageLatitude,
      longitude: imageLongitude,
      nursing_room: data.nursing_room ?? false,
      anyone_toilet: data.anyone_toilet ?? false,
      diaper_changing_station: data.diaper_changing_station ?? false,
      powder_corner: data.powder_corner ?? false,
      stroller_accessible: data.stroller_accessible ?? false,
      evaluation: data.evaluation,
      image: image,
    }

    try {
      const { error } = await supabase.from('posts').insert([postData])

      if (error) {
        throw new Error(error.message)
      }

      const createPosts = async () => {
        const { data, error } = await supabase.from('posts').select('*')
        if (error) {
          throw new Error(error.message)
        }
        return data
      }

      await createPosts()
      mutate('fetchPosts')
      resetModal()
      setImageToiletCleanness(0)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Request failed:', error.message)
      } else {
        console.error('Request failed:', error)
      }
    }
  }

  return (
    <AddSimpleRestroom
      open={open}
      onClose={resetModal}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      fileName={fileName}
      imageData={imageData}
      selectImageFile={selectImageFile}
      resetImageFile={resetImageFile}
      register={{ ...rest, ref }}
      fileInput={fileInput}
      onChange={onChange} //ファイル分割用に追加
      warningImageMessage={warningImageMessage}
      confirmImageMessage={confirmImageMessage}
      warningCoordMessage={warningCoordMessage}
      isLoading={isLoading}
    />
  )
}

export default AddSimpleRestroomContainer
