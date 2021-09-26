import React, { useState, useEffect } from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Button, Text } from "../../../components"
import Modal from "react-native-modal"
import { PieChartView } from "./pie-chart/pie-chart-view"

export const ExpenseChartModal = ({ closeModal }) => {
  return (
    <View>
      <Modal isVisible={true} onBackdropPress={() => closeModal()}>
        <View style={ExpenseChartModalStyle.BASE}>
          <View style={ExpenseChartModalStyle.CONTENT}>
            <PieChartView />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const ExpenseChartModalStyle = StyleSheet.create({
  BASE: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: "50%",
    minWidth: "100%",
    justifyContent: "center",
  },
  CONTENT: {
    flex: 1,
    borderWidth: 1,
  },
  TEXT_INPUT: {
    borderWidth: 1,
    color: "blue",
    borderColor: "black",
    marginHorizontal: 15,
    paddingBottom: 20,
    marginBottom: 10,
  },
})
