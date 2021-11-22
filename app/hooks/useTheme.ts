import { onSnapshot } from "mobx-state-tree"
import React, { useState } from "react"
import { useStores } from "../models"

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false)
  const { user } = useStores()

  onSnapshot(user, (update) => {
    setDarkMode(update.darkMode)
  })

  return { darkMode }
}
