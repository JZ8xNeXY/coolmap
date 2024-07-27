import useSWR from 'swr'

export const useUserState = () => {
  type userStateType = {
    id: number
    email: string
    isSignedIn: boolean
    isFetched: boolean
  }

  const fallbackData: userStateType = {
    id: 0,
    email: '',
    isSignedIn: false,
    isFetched: false,
  }

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [userStateType, (value: userStateType) => void]
}
