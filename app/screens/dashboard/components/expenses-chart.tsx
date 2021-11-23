import React, { useState, useEffect } from "react"
import { View, StyleSheet, Image, useWindowDimensions } from "react-native"
import { Text as TextComp } from "../../../components"
import { PieChartData, PieChartView } from "./pie-chart/pie-chart-view"
import { useIsFocused } from "@react-navigation/native"
import { useStores } from "../../../models"
import { onSnapshot } from "mobx-state-tree"
import { getPieChartTotalValue } from "./pie-chart/pie-chart-calculation"
import HorizontalPicker from "@vseslav/react-native-horizontal-picker"
import moment from "moment"
import { Expense } from "../../../models/expense/expense"
import { ExpenseItemData } from "../../../utils/types"
import { AppTheme } from "../../../utils/themes"
import { useTheme } from "../../../hooks/useTheme"

export const ExpensesChart = ({
  expenseDetails,
  pickedMonth,
}: {
  expenseDetails: ExpenseItemData[]
  pickedMonth: (val: number) => void
}) => {
  const isFocused = useIsFocused()
  const { expenseStore, user } = useStores()
  const { expenses } = expenseStore
  const [expenseData, setExpenseData] = useState<PieChartData[]>([])
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const { darkMode } = useTheme()
  const Items = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const itemWidth = 100
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    if (isFocused) {
      PieChartValueGenerator()
    }
  }, [expenses, isFocused, expenseDetails])

  onSnapshot(expenseStore, () => {
    PieChartValueGenerator()
  })

  function PieChartValueGenerator() {
    if (expenseDetails?.length > 0) {
      /*
       TO FILTER DUPLICATED EXPENSE CATEGORY 
       AND CALCULATE THE TOTAL expenseDetails?
      */
      var obj2 = []
      var holder = {} // {'1': 2000}

      expenseDetails?.forEach((d) => {
        if (holder.hasOwnProperty(d.category)) {
          holder[d.category] = parseFloat(holder[d.category]) + parseFloat(d.total)
        } else {
          holder[d.category] = d.total
        }
      })

      for (var prop in holder) {
        // Get colour code for each category
        const fetchData = expenseDetails?.find((val) => {
          if (val?.category === prop) {
            return val?.colourCode
          }
        })

        obj2.push({
          category: prop,
          value: holder[prop],
          colourCode: fetchData?.colourCode,
        })
      }

      const extractedData = obj2.map((val) => {
        const tempExpense = {}
        tempExpense["category"] = parseInt(val.category)
        tempExpense["value"] = parseFloat(val.value)
        tempExpense["color"] = val?.colourCode
        return tempExpense
      })

      const totalExpenseVal = getPieChartTotalValue(extractedData)
      setExpenseData(extractedData)
      setTotalExpense(totalExpenseVal)
    } else {
      setExpenseData([])
    }
  }

  const renderMonth = (item) => (
    <View style={{ width: itemWidth, alignItems: "center" }}>
      <TextComp preset="fieldLabel" style={{ color: "white", fontSize: 18 }} text={item} />
    </View>
  )

  return (
    <View
      style={[
        ExpenseStyle.CHART_CARD,
        {
          backgroundColor: darkMode ? "rgba(0, 0, 0, 0.18)" : AppTheme.light.colors.card,
          height: height / 3,
        },
      ]}
    >
      <TextComp style={ExpenseStyle.TITLE} text="Expenses Chart" />

      <View style={{ height: 20 }}>
        <HorizontalPicker
          data={Items}
          renderItem={renderMonth}
          itemWidth={itemWidth}
          onChange={(val) => pickedMonth(parseInt(moment(Items[val], "MMM").format("MM")))}
        />
      </View>
      <Image
        source={require("../../../../assets/up-arrows.png")}
        style={{ width: 30, height: 30, tintColor: darkMode ? "white" : "black" }}
      />
      {expenseData.length !== 0 ? (
        <PieChartView
          data={expenseData}
          outerRadius={width / 5}
          innerRadius={width / 7}
          type={"simple"}
          totalValue={totalExpense}
        />
      ) : (
        <>
          <TextComp style={ExpenseStyle.NO_VALUE} text="No Expense Recorded" />
        </>
      )}

      {/* <TouchableOpacity onPress={() => setShowChartDetail(true)}>
        <ImageComp
          style={ExpenseStyle.ZOOM_ICON}
          source={require("../../../../assets/diets.png")}
        />
      </TouchableOpacity>
      {showChartDetails ? <ExpenseChartModal closeModal={() => setShowChartDetail(false)} /> : null} */}
    </View>
  )
}

export const PieChartColorHandler = (categoryID: string) => {
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
    case "8":
      return "#F162B8"
    default:
      return "#F162B8"
  }
}

const ExpenseStyle = StyleSheet.create({
  CHART_CARD: {
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: "#FFFFFFFF",
    shadowOpacity: 0.5,
    elevation: 1,
    borderColor: "white",
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
