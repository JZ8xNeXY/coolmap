declare module 'react-awesome-stars-rating' {
  import { ComponentType } from 'react'

  interface AwesomeStarsRatingProps {
    value?: number
    onChange?: (value: number) => void
    isEdit?: boolean
    size?: number
    primaryColor?: string
    secondaryColor?: string
  }

  const AwesomeStarsRating: ComponentType<AwesomeStarsRatingProps>

  export default AwesomeStarsRating
}
