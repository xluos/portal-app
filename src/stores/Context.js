import React, { useContext } from 'react'

export const subAppConfig = React.createContext({})
export function useSubAppConfigContext () {
  return useContext(subAppConfig)
}