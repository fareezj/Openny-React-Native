/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WelcomeScreen, DemoScreen, DemoListScreen } from "../screens"
import { DashboardScreen } from "../screens/dashboard/dashboard-screen"
import { AddExpenseScreen } from "../screens/add-expense/add-expense-screen"
import { AnalyticScreen } from "../screens/expense-analytics/analytics-screen"
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer"
import { Image, View } from "react-native"
import { useStores } from "../models"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  dashboard: undefined
  addExpense: undefined
  analytics: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()
const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
  const { user } = useStores()

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Light Theme" onPress={() => user.toggleTheme()} />
      <DrawerItem label="Dark Theme" onPress={() => user.toggleTheme()} />
    </DrawerContentScrollView>
  )
}

export function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={"dashboard"}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          drawerLabelStyle: { fontSize: 16 },
          drawerIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/home-filled.png")
                  : require("../assets/home-outline.png")
              }
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
        component={DashboardScreen}
      />
      <Drawer.Screen name="addExpense" component={AddExpenseScreen} />
      <Drawer.Screen name="analytics" component={AnalyticScreen} />
    </Drawer.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
