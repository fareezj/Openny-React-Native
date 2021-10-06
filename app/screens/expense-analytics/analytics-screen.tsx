import React, { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts"
import { useStores } from "../../models"
import moment from "moment"
import { HeaderBack } from "../../components/header-back/header-back"
import { onSnapshot } from "mobx-state-tree"

export const AnalyticScreen = () => {
  const { expenseStore } = useStores()
  const { expenses } = expenseStore
  const [dataMapping, setDataMapping] = useState<number[]>([50, 10, 40, 95, -4, 50, -20, -80])
  const [dataXValue, setDataXValue] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const contentInset = { top: 20, bottom: 20 }

  useEffect(() => {
    SortExpenseMapping()
  }, [expenses])

  onSnapshot(expenseStore, () => {
    SortExpenseMapping()
  })

  function SortExpenseMapping() {
    const finalXValue = []
    const finalYValue = []

    var holder = {}
    expenses.forEach((val) => {
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

    // const finalXValueSort = finalXValue
    //   .reduce((prevVal, curVal) => {
    //     if (parseInt(curVal.slice(0, 2)) > 0) {
    //       prevVal.push(curVal.slice(0, 2))
    //     }
    //     return prevVal
    //   }, [])
    //   .sort((a, b) => {
    //     return a - b
    //   })
    // console.log("x-value", finalXValueSort)
    // console.log("y-value", finalYValue)
    setDataXValue(finalXValue)
    setDataMapping(finalYValue)
  }

  return (
    <View style={AnalticsStyle.FULL}>
      <Screen style={AnalticsStyle.CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <HeaderBack title={"Expense Analysis Graph"} />
        <View style={{ borderWidth: 0, height: 350, marginTop: 50 }}>
          <ScrollView horizontal={true} bounces={true}>
            <View>
              <Text text="RM" style={{ position: "absolute", left: 30 }} />
            </View>
            <View style={{ height: 300, flexDirection: "row", width: 600, marginTop: 20 }}>
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
                style={{
                  marginHorizontal: -500,
                  marginVertical: 300,
                  height: 300,
                  width: 500,
                }}
                data={dataXValue}
                formatLabel={(value, index) =>
                  moment(dataXValue[index], "DD MMM YYYY").format("DD")
                }
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 12, fill: "white" }}
              />
              <View>
                <Text text="Days" style={{ position: "absolute", top: 300, left: 520 }} />
              </View>
            </View>
          </ScrollView>
        </View>
      </Screen>
    </View>
  )
}

const AnalticsStyle = StyleSheet.create({
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
