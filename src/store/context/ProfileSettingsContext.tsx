import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { createContext } from 'react'

interface ctxInterface {
  openProfile: boolean
  setOpenProfile: Dispatch<SetStateAction<boolean>>
}

const ctxInitial = {
  openProfile: false,
  setOpenProfile: (state: boolean) => {},
} as ctxInterface

export const ProfileSettingsContext = createContext(ctxInitial)

const ProfileSettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [openProfile, setOpenProfile] = useState(ctxInitial.openProfile)

  return (
    <ProfileSettingsContext.Provider value={{ openProfile, setOpenProfile }}>
      {children}
    </ProfileSettingsContext.Provider>
  )
}

export default ProfileSettingsContextProvider
