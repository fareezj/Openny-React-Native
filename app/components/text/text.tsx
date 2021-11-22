import React, { useState } from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"
import { useStores } from "../../models"
import { AppTheme } from "../../utils/themes"
import { onSnapshot } from "mobx-state-tree"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  const { user } = useStores()
  // grab the props
  const { preset = "default", tx, txOptions, text, children, style: styleOverride, ...rest } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const style = presets[preset] || presets.default
  const styles = [style, styleOverride]
  const [darkmode, setDarkMode] = useState(false)

  onSnapshot(user, (theme) => {
    setDarkMode(theme.darkMode)
  })

  return (
    <ReactNativeText
      {...rest}
      style={[styles, { color: darkmode ? AppTheme.dark.colors.text : AppTheme.light.colors.text }]}
    >
      {content}
    </ReactNativeText>
  )
}
