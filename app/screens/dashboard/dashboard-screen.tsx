import React, { useState, useEffect } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, Image, StyleSheet, FlatList } from "react-native"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { ExpensesChart } from "./components/expenses-chart"
import { FloatingAction } from "react-native-floating-action"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { ExpenseItem } from "./components/expense-item"
import { observer } from "mobx-react-lite"
import { ExpenseItemData } from "../../utils/types"
import { ExpenseItemModal } from "./components/expense-item-modal"

const actions = [
  {
    text: "Add Expense",
    icon: require("../../../assets/wallet-out.png"),
    name: "addExpense",
    position: 1,
    buttonSize: 40,
    textStyle: { color: "white" },
    textBackground: "rgba(52, 52, 52, 0)",
  },
]

export const DashboardScreen = observer(function DashboardScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const { expenseStore } = useStores()
  const { expenses } = expenseStore
  const [expenseItem, setExpenseItem] = useState<ExpenseItemData[]>()
  const [showExpenseDetail, setShowExpenseDetail] = useState(false)
  const [currentExpenseDetail, setCurrentExpenseDetail] = useState("")

  useEffect(() => {
    if (isFocused) {
      setExpenseItem(expenses)
    }
  }, [isFocused, observer])

  return (
    <View style={DashboardStyle.FULL}>
      <Screen style={DashboardStyle.CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <View style={DashboardStyle.HEADER}>
          <Text style={DashboardStyle.HEADER_NAME} text="Hello Fareez" />
          <Image source={require("../../../assets/user.png")} style={DashboardStyle.HEADER_ICON} />
        </View>
        <ExpensesChart />
        <FlatList
          data={expenseItem}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ExpenseItem
                id={item.id}
                category={item.category}
                colourCode={item.colourCode}
                total={item.total}
                date={item.date}
                onClickDetail={(val) => {
                  setCurrentExpenseDetail(val)
                  setShowExpenseDetail(true)
                }}
              />
            )
          }}
        />
      </Screen>
      <FloatingAction
        actions={actions}
        overlayColor={"rgba(52, 52, 52, 0)"}
        onPressItem={(name) => navigation.navigate(name)}
      />
      {showExpenseDetail ? (
        <ExpenseItemModal
          closeModal={() => setShowExpenseDetail(false)}
          id={currentExpenseDetail}
        />
      ) : null}
    </View>
  )
})

const DashboardStyle = StyleSheet.create({
  FULL: { flex: 1, backgroundColor: "#0E164C" },
  CONTAINER: {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
  },
  HEADER: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HEADER_NAME: {
    fontSize: 22,
    fontWeight: "bold",
  },
  HEADER_ICON: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
})
