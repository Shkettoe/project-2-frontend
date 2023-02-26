import React, { useState } from 'react'
import { createContext } from 'react'

const ctxInitial = {
  openProfile: false,
  setOpenProfile: (state: boolean) => {},
}

export const ProfileSettingsContext = createContext(ctxInitial)

const ProfileSettingsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [openProfile, setOpenProfile] = useState(ctxInitial.openProfile)

  return <ProfileSettingsContext.Provider value={{ openProfile, setOpenProfile }}>{children}</ProfileSettingsContext.Provider>
}

export default ProfileSettingsContextProvider
