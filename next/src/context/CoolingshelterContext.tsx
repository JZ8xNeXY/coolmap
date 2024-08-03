import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Coolingshelter {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  tel: string
  openingHours: string
  closedDays: string
  waterCooler: boolean
  waterServer: boolean
  vendingMachine: boolean
  drinkingWaterProvided: boolean
  installationPlanned: boolean
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
  tel: '',
  openingHours: '',
  closedDays: '',
  waterCooler: false,
  waterServer: false,
  vendingMachine: false,
  drinkingWaterProvided: false,
  installationPlanned: false,
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
