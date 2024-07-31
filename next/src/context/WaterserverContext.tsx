import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Waterserver {
  id: number
  name: string
  address: string
  place: string
  latitude: number
  longitude: number
  spoutType: boolean
  bottleDispenserType: boolean
  image: string
}

interface WaterserverContextProps {
  selectedWaterserver: Waterserver
  setSelectedWaterserver: React.Dispatch<React.SetStateAction<Waterserver>>
}

const defaultWaterserver: Waterserver = {
  id: 0,
  name: '',
  address: '',
  place: '',
  latitude: 0,
  longitude: 0,
  spoutType: false,
  bottleDispenserType: false,
  image: '',
}

const WaterserverContext = createContext<WaterserverContextProps | undefined>(
  undefined,
)

export function WaterserverProvider({ children }: { children: ReactNode }) {
  const [selectedWaterserver, setSelectedWaterserver] =
    useState<Waterserver>(defaultWaterserver)

  return (
    <WaterserverContext.Provider
      value={{ selectedWaterserver, setSelectedWaterserver }}
    >
      {children}
    </WaterserverContext.Provider>
  )
}

export const useWaterserverContext = () => {
  const context = useContext(WaterserverContext)
  if (!context) {
    throw new Error(
      'useWaterserverContext must be used within a CoolingshelterProvider',
    )
  }
  return context
}
