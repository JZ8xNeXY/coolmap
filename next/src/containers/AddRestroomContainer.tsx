import AWS from 'aws-sdk'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import { supabase } from '../utils/supabase'
import AddRestroom from '@/presentationals/AddRestroom'
import { chatgpt, encodeImageToBase64 } from '@/utils/chatgptAPI'

interface AddRestroomFormData {
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

interface AddRestroomProps {
  open: boolean
  onClose: () => void
  coords: { lat: number; lng: number } | null
}

const AddRestroomContainer: React.FC<AddRestroomProps> = ({
  open,
  onClose,
  coords,
}) => {
  const { register, handleSubmit, control, reset, setValue } =
    useForm<AddRestroomFormData>({
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
      },
    })

  const fileInput = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement> //更新可能
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const [imageToiletCleanness, setImageToiletCleanness] = useState<number>(0)
  const [warningImageMessage, setWarningImageMessage] = useState('')
  const [confirmImageMessage, setConfirmMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null) //S3のURL

  useEffect(() => {
    setValue('evaluation', imageToiletCleanness)
  }, [imageToiletCleanness, setValue])

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    showImageFileName(files)
    const isOk = await onChangeEvaluateToiletCleanness(files)
    if (isOk) {
      await onChangeUploadFileToS3(files)
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

  const evaluateToiletCleanness = async (file: File) => {
    setIsLoading(true)
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
      setImageUrl(Location) // 画像URLをステートに保存
    } catch (error) {
      console.error('Error uploading file to S3:', error)
      throw new Error('Failed to upload file to S3')
    }
  }

  const onChangeUploadFileToS3 = async (files: FileList) => {
    const file = files[0]
    await uploadFileToS3(file)
  }

  const onSubmit: SubmitHandler<AddRestroomFormData> = async (data) => {
    if (coords) {
      if (!fileInput.current?.files || fileInput.current.files.length === 0) {
        setWarningImageMessage('トイレの画像をアップロードしてください')
        return
      }

      const postData = {
        name: data.name,
        address: data.address,
        content: data.content,
        latitude: coords.lat,
        longitude: coords.lng,
        nursing_room: data.nursing_room ?? false,
        anyone_toilet: data.anyone_toilet ?? false,
        diaper_changing_station: data.diaper_changing_station ?? false,
        powder_corner: data.powder_corner ?? false,
        stroller_accessible: data.stroller_accessible ?? false,
        evaluation: data.evaluation,
        image: imageUrl,
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
  }

  return (
    <AddRestroom
      open={open}
      onClose={resetModal}
      coords={coords}
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
      isLoading={isLoading}
    />
  )
}

export default AddRestroomContainer
