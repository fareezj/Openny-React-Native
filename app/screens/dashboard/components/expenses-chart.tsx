import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Text as TextComp } from "../../../components"
import { PieChartView } from "./pie-chart/pie-chart-view"
import { useIsFocused } from "@react-navigation/native"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"
import { onSnapshot } from "mobx-state-tree"
import { getPieChartTotalValue } from "./pie-chart/pie-chart-calculation"

export const ExpensesChart = observer(function ExpensesChart() {
  const isFocused = useIsFocused()
  const { expenseStore } = useStores()
  const { expenses } = expenseStore
  const [showChartDetails, setShowChartDetail] = useState(false)
  const [expenseData, setExpenseData] = useState([])
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const pieData = [50, 10, 40, 95, -4, -24, 85, 91, 23, 34]

  useEffect(() => {
    if (isFocused) {
      PieChartValueGenerator()
    }
  }, [expenses, isFocused])

  onSnapshot(expenseStore, (newSnapshot) => {
    console.info("Got new snapshot:", newSnapshot)
    PieChartValueGenerator()
  })

  function PieChartValueGenerator() {
    if (expenses.length > 0) {
      /*
       TO FILTER DUPLICATED EXPENSE CATEGORY 
       AND CALCULATE THE TOTAL EXPENSES
      */
      var obj2 = []
      var holder = {} // {'1': 2000}
      var totalExpense

      expenses.forEach((d) => {
        if (holder.hasOwnProperty(d.category)) {
          holder[d.category] = parseFloat(holder[d.category]) + parseFloat(d.total)
        } else {
          holder[d.category] = d.total
        }
      })

      for (var prop in holder) {
        obj2.push({ category: prop, value: holder[prop] })
      }

      const extractedData = obj2.map((val) => {
        const tempExpense = {}
        tempExpense["category"] = parseInt(val.category)
        tempExpense["value"] = parseFloat(val.value)
        tempExpense["color"] = PieChartColorHandler(val.category)
        return tempExpense
      })
      const totalExpenseVal = getPieChartTotalValue(extractedData)
      setExpenseData(extractedData)
      setTotalExpense(totalExpenseVal)
    } else {
      setExpenseData([])
    }
  }

  return (
    <View style={ExpenseStyle.CHART_CARD}>
      <TextComp style={ExpenseStyle.TITLE} text="Expenses Chart" />
      {/* <Text style={ExpenseStyle.NO_VALUE} text="No Expense Recorded" /> */}

      <PieChartView
        data={expenseData}
        outerRadius={118}
        innerRadius={80}
        type={"simple"}
        totalValue={totalExpense}
      />

      {/* <TouchableOpacity onPress={() => setShowChartDetail(true)}>
        <ImageComp
          style={ExpenseStyle.ZOOM_ICON}
          source={require("../../../../assets/diets.png")}
        />
      </TouchableOpacity>
      {showChartDetails ? <ExpenseChartModal closeModal={() => setShowChartDetail(false)} /> : null} */}
    </View>
  )
})

const PieChartColorHandler = (categoryID: string) => {
  switch (categoryID) {
    case "1":
      return "#ff8e00"
    case "2":
      return "#cd2956"
    case "3":
      return "#2ECC71"
    case "4":
      return "#F4D03F"
    case "5":
      return "#D2B4DE"
    case "6":
      return "#F39C12"
    case "7":
      return "#A2D9CE"
    default:
      return "#FFFFFF"
  }
}

const ExpenseStyle = StyleSheet.create({
  CHART_CARD: {
    borderWidth: 1,
    backgroundColor: "#51499C",
    // height: 200,
    borderRadius: 30,
    alignItems: "center",
  },
  ZOOM_ICON: {
    width: 20,
    height: 20,
  },
  TITLE: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  NO_VALUE: {
    fontSize: 14,
    fontWeight: "400",
    paddingVertical: 50,
  },
})
