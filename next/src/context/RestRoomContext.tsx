import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Restroom {
  id: number
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursingRoom: boolean
  anyoneToilet: boolean
  diaperChangingStation: boolean
  powderCorner: boolean
  strollerAccessible: boolean
  evaluation: number
  image: string
}

interface RestroomContextProps {
  selectedRestroom: Restroom
  setSelectedRestroom: React.Dispatch<React.SetStateAction<Restroom>>
}

const defaultRestroom: Restroom = {
  id: 0,
  name: '',
  address: '',
  content: '',
  image: '',
  latitude: 0,
  longitude: 0,
  createdAt: '',
  nursingRoom: false,
  anyoneToilet: false,
  diaperChangingStation: false,
  powderCorner: false,
  strollerAccessible: false,
  evaluation: 0,
}

const RestroomContext = createContext<RestroomContextProps | undefined>(
  undefined,
)

export function RestroomProvider({ children }: { children: ReactNode }) {
  const [selectedRestroom, setSelectedRestroom] =
    useState<Restroom>(defaultRestroom)

  return (
    <RestroomContext.Provider value={{ selectedRestroom, setSelectedRestroom }}>
      {children}
    </RestroomContext.Provider>
  )
}

export const useRestroomContext = () => {
  const context = useContext(RestroomContext)
  if (!context) {
    throw new Error('useRestroomContext must be used within a RestroomProvider')
  }
  return context
}
