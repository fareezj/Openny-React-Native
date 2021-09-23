import React from "react"
import { View, ViewStyle, TextStyle, ImageStyle, Image, StyleSheet } from "react-native"
import { Screen, Text } from "../../../components"

export const ExpensesChart = () => {
  return (
    <View style={ExpenseStyle.CHART_CARD}>
      <Text style={ExpenseStyle.TITLE} text="Expenses Chart" />
      <Text style={ExpenseStyle.NO_VALUE} text="No Expense Recorded" />
    </View>
  )
}

const ExpenseStyle = StyleSheet.create({
  CHART_CARD: {
    borderWidth: 1,
    backgroundColor: "#51499C",
    height: 200,
    borderRadius: 30,
    alignItems: "center",
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
