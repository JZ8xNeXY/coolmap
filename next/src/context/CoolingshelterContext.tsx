import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Coolingshelter {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  openingHours: string
  hasWaterServer: boolean
  hasDesk: boolean
  hasChair: boolean
  hasPowerOutlet: boolean
  hasTv: boolean
  capacity: number
  remarks: string
  image: string
}

interface CoolingshelterContextProps {
  selectedCoolingshelter: Coolingshelter
  setSelectedCoolingshelter: React.Dispatch<
    React.SetStateAction<Coolingshelter>
  >
}

const defaultCoolingshelter: Coolingshelter = {
  id: 0,
  name: '',
  address: '',
  latitude: 0,
  longitude: 0,
  openingHours: '',
  hasWaterServer: false,
  hasDesk: false,
  hasPowerOutlet: false,
  hasChair: false,
  hasTv: false,
  capacity: 0,
  remarks: '',
  image: '',
}

const CoolingshelterContext = createContext<
  CoolingshelterContextProps | undefined
>(undefined)

export function CoolingshelterProvider({ children }: { children: ReactNode }) {
  const [selectedCoolingshelter, setSelectedCoolingshelter] =
    useState<Coolingshelter>(defaultCoolingshelter)

  return (
    <CoolingshelterContext.Provider
      value={{ selectedCoolingshelter, setSelectedCoolingshelter }}
    >
      {children}
    </CoolingshelterContext.Provider>
  )
}

export const useCoolingshelterContext = () => {
  const context = useContext(CoolingshelterContext)
  if (!context) {
    throw new Error(
      'useCoolingshelterContext must be used within a CoolingshelterProvider',
    )
  }
  return context
}
