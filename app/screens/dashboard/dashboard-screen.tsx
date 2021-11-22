import React, { useState, useEffect } from "react"
import { View, Image, StyleSheet, FlatList } from "react-native"
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
import { NewUserModal } from "./components/new-user-modal"
import { ExpenseDateSorter } from "../../utils/expenseDateSorter"
import { onSnapshot } from "mobx-state-tree"
import { LogBox } from "react-native"
LogBox.ignoreLogs(["Warning: ..."]) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

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
  {
    text: "Expense Analytics",
    icon: require("../../../assets/wallet-out.png"),
    name: "analytics",
    position: 1,
    buttonSize: 40,
    textStyle: { color: "white" },
    textBackground: "rgba(52, 52, 52, 0)",
  },
]

export const DashboardScreen = observer(function DashboardScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const { expenseStore, user } = useStores()
  const { expenses } = expenseStore
  const [expenseItem, setExpenseItem] = useState<ExpenseItemData[]>()
  const [showExpenseDetail, setShowExpenseDetail] = useState<boolean>(false)
  const [showNewUserModal, setNewUserModal] = useState<boolean>(false)
  const [currentExpenseID, setCurrentExpenseID] = useState<string>("")
  const [currentMonth, setCurrentMonth] = useState<number>(1)

  useEffect(() => {
    if (isFocused) {
      const res = ExpenseDateSorter(expenses, currentMonth.toString())
      setExpenseItem(res)
    }
  }, [isFocused, currentMonth])

  onSnapshot(expenseStore, () => {
    const res = ExpenseDateSorter(expenses, currentMonth.toString())
    setExpenseItem(res)
  })

  return (
    <View style={DashboardStyle.FULL}>
      <Screen style={DashboardStyle.CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <View style={DashboardStyle.HEADER}>
          <Text style={DashboardStyle.HEADER_NAME} text={"Hello " + user?.name ?? ""} />
          <Image source={require("../../../assets/user.png")} style={DashboardStyle.HEADER_ICON} />
        </View>
        <ExpensesChart expenseDetails={expenseItem} pickedMonth={(val) => setCurrentMonth(val)} />
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
                onClickDetail={(id: string) => {
                  setCurrentExpenseID(id)
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
        <ExpenseItemModal closeModal={() => setShowExpenseDetail(false)} id={currentExpenseID} />
      ) : null}
      {!user.id ? <NewUserModal closeModal={() => setNewUserModal(false)} /> : null}
    </View>
  )
})

const DashboardStyle = StyleSheet.create({
  FULL: { flex: 1 },
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
    padding: 10,
  },
  HEADER_ICON: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
})
