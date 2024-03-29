/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React, { useState } from "react"
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
import { Image, View, Switch, Text } from "react-native"
import { useStores } from "../models"
import { useTheme } from "../hooks/useTheme"

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
      <View
        style={{
          flexDirection: "row",
          marginTop: 22,
          marginHorizontal: 20,
          justifyContent: "space-between",
        }}
      >
        <Text>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={user.darkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => user.toggleTheme()}
          value={user.darkMode}
        />
      </View>
    </DrawerContentScrollView>
  )
}

export function MainNavigator() {
  const { darkMode } = useTheme()
  return (
    <Drawer.Navigator
      initialRouteName={"dashboard"}
      screenOptions={{
        drawerStyle: {
          backgroundColor: darkMode ? "#0E164C" : "white",
          width: 250,
        },
        headerStyle: {
          backgroundColor: darkMode ? "#0E164C" : "white",
        },
      }}
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
              style={{ width: 30, height: 30, tintColor: darkMode && !focused ? "white" : null }}
            />
          ),
        }}
        component={DashboardScreen}
      />
      <Drawer.Screen
        name="addExpense"
        options={{
          title: "Add Expense",
          drawerLabelStyle: { fontSize: 16 },
          drawerIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/expense-filled.png")
                  : require("../assets/expense-outline.png")
              }
              style={{ width: 30, height: 30, tintColor: darkMode && !focused ? "white" : null }}
            />
          ),
        }}
        component={AddExpenseScreen}
      />
      <Drawer.Screen
        name="analytics"
        options={{
          title: "Expense Analytics",
          drawerLabelStyle: { fontSize: 16 },
          drawerIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/analytics-filled.png")
                  : require("../assets/analytics-outline.png")
              }
              style={{ width: 30, height: 30, tintColor: darkMode && !focused ? "white" : null }}
            />
          ),
        }}
        component={AnalyticScreen}
      />
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
