import React from "react"
import { View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { Calculator } from "react-native-calculator"

export const CalculatorModal = ({ closeModal, getExpenseTotal, currentTotal }) => {
  const getTotalExpense = (value) => {
    getExpenseTotal(value)
    closeModal()
  }
  return (
    <View>
      <Modal isVisible={true} onBackdropPress={() => closeModal()}>
        <View style={CalculatorModalStyle.BASE}>
          <View style={CalculatorModalStyle.CONTENT}>
            <Calculator
              style={{ flex: 1 }}
              hasAcceptButton={true}
              value={currentTotal}
              onAccept={(value) => getTotalExpense(value.toString())}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const CalculatorModalStyle = StyleSheet.create({
  BASE: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "white",
    maxHeight: 400,
    maxWidth: 400,
    padding: 15,
    justifyContent: "center",
  },
  CONTENT: {
    flex: 1,
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
