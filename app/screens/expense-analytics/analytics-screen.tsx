import React, { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Image } from "react-native"
import { Text, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts"
import { useStores } from "../../models"
import moment from "moment"
import { HeaderBack } from "../../components/header-back/header-back"
import { onSnapshot } from "mobx-state-tree"
import { ExpenseItemData } from "../../utils/types"
import { ExpenseDateSorter } from "../../utils/expenseDateSorter"
import HorizontalPicker from "@vseslav/react-native-horizontal-picker"

export const AnalyticScreen = () => {
  const { expenseStore } = useStores()
  const { expenses } = expenseStore
  const [dataMapping, setDataMapping] = useState<number[]>([50, 10, 40, 95, -4, 50, -20, -80])
  const [dataXValue, setDataXValue] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [currentMonth, setCurrentMonth] = useState<number>(1)
  const [expenseExist, setExpenseExist] = useState<boolean>(false)
  const contentInset = { top: 20, bottom: 20 }
  const Items = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const itemWidth = 100

  useEffect(() => {
    const res = ExpenseDateSorter(expenses, currentMonth.toString())
    SortExpenseMapping(res)
  }, [expenses, currentMonth])

  onSnapshot(expenseStore, () => {
    const res = ExpenseDateSorter(expenses, currentMonth.toString())
    SortExpenseMapping(res)
  })

  function SortExpenseMapping(expenseData: ExpenseItemData[]) {
    const finalXValue = []
    const finalYValue = []

    expenseData.length > 0 ? setExpenseExist(true) : setExpenseExist(false)

    var holder = {}
    expenseData.forEach((val) => {
      if (holder.hasOwnProperty(val.date)) {
        holder[val.date] = parseFloat(holder[val.date]) + parseFloat(val.total)
      } else {
        holder[val.date] = parseFloat(val.total)
      }
    })

    console.log("holder before", holder)
    Object.keys(holder)
      .sort((a, b) => {
        return parseFloat(a.slice(0, 2)) - parseFloat(b.slice(0, 2))
      })
      .forEach((val) => {
        finalXValue.push(val)
        finalYValue.push(holder[val])
        console.log("holder after", holder, holder[val])
      })

    setDataXValue(finalXValue)
    setDataMapping(finalYValue)
  }

  const renderMonth = (item) => (
    <View style={{ width: itemWidth, alignItems: "center" }}>
      <Text preset="fieldLabel" style={{ color: "white", fontSize: 22 }} text={item} />
    </View>
  )

  const NoAnalyticRecorded = () => {
    return (
      <View style={AnalticsStyle.NO_EXPENSE_BASE}>
        <Text
          style={AnalticsStyle.NO_EXPENSE_TEXT}
          text={`No expenses recorded in month: ${Items[currentMonth - 1]}`}
        />
      </View>
    )
  }

  return (
    <View style={AnalticsStyle.FULL}>
      <Screen style={AnalticsStyle.CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <HeaderBack title={"Expense Analysis Graph"} />
        <View style={{ borderWidth: 0, height: 450, marginTop: 50 }}>
          <View style={{ height: 40 }}>
            <HorizontalPicker
              data={Items}
              renderItem={renderMonth}
              itemWidth={itemWidth}
              onChange={(val) => setCurrentMonth(parseInt(moment(Items[val], "MMM").format("MM")))}
            />
          </View>
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <Image
              source={require("../../../assets/up-arrows.png")}
              style={{ width: 30, height: 30, tintColor: "white" }}
            />
          </View>
          {expenseExist ? (
            <ScrollView horizontal={true} bounces={true} style={{ paddingTop: 20 }}>
              <View>
                <Text text="RM" style={AnalticsStyle.Y_LABEL} />
              </View>
              <View style={AnalticsStyle.CHART_BASE}>
                <YAxis
                  data={dataMapping}
                  contentInset={contentInset}
                  svg={{
                    fill: "white",
                    fontSize: 12,
                  }}
                  numberOfTicks={5}
                  formatLabel={(value) => `${value.toFixed(2)}`}
                />
                <LineChart
                  style={{ height: 300, width: 500 }}
                  data={dataMapping}
                  svg={{ stroke: "rgb(134, 65, 244)" }}
                  contentInset={{ ...contentInset, left: 20, right: 20 }}
                >
                  <Grid />
                </LineChart>
                {console.log(dataXValue)}
                <XAxis
                  style={AnalticsStyle.X_AXIS}
                  data={dataXValue}
                  formatLabel={(value, index) =>
                    moment(dataXValue[index], "DD MMM YYYY").format("DD")
                  }
                  contentInset={{ left: 20, right: 20 }}
                  svg={{ fontSize: 12, fill: "white" }}
                />
                <View>
                  <Text text="Days" style={AnalticsStyle.X_LABEL} />
                </View>
              </View>
            </ScrollView>
          ) : (
            <NoAnalyticRecorded />
          )}
        </View>
      </Screen>
    </View>
  )
}

const AnalticsStyle = StyleSheet.create({
  NO_EXPENSE_BASE: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 50,
    width: 330,
    marginTop: 80,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  NO_EXPENSE_TEXT: {
    color: "black",
    textAlign: "center",
  },
  Y_LABEL: {
    position: "absolute",
    left: 30,
  },
  CHART_BASE: {
    height: 300,
    flexDirection: "row",
    width: 600,
    marginTop: 20,
  },
  X_LABEL: {
    position: "absolute",
    top: 300,
    left: 520,
  },
  X_AXIS: {
    marginHorizontal: -500,
    marginVertical: 300,
    height: 300,
    width: 500,
  },
  FULL: { flex: 1, backgroundColor: "#0E164C" },
  TITLE: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 20,
  },
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
  HEADER_BASE: {
    flexDirection: "row",
    alignItems: "center",
  },
  HEADER_TITLE: {
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  BACK_ICON: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: "white",
  },
})
