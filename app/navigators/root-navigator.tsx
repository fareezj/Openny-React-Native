/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React, { useEffect, useState } from "react"
import { DarkTheme, NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MainNavigator } from "./main-navigator"
import { color } from "../theme"
import { useStores } from "../models"
import { CategoryData } from "../screens/add-expense/constants/category-data"
import { AppTheme, LightTheme } from "../utils/themes"
import { observer } from "mobx-react-lite"
import { onSnapshot } from "mobx-state-tree"
import { theme } from "@storybook/react-native/dist/preview/components/Shared/theme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  mainStack: undefined
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: color.palette.deepPurple },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="mainStack"
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const { expenseCategoryStore, user } = useStores()
  const { expenseCategories } = expenseCategoryStore
  const [mode, setMode] = useState(false)
  onSnapshot(user, (userUpdate) => {
    console.log(userUpdate)
    setMode(userUpdate.darkMode)
  })

  useEffect(() => {
    let initCategories = CategoryData
    if (expenseCategories.length < 1) {
      initCategories.map((val) => {
        expenseCategoryStore.saveExpenseCategories(val)
      })
    }
  }, [])

  return (
    <NavigationContainer {...props} ref={ref} theme={mode ? AppTheme.dark : AppTheme.light}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
