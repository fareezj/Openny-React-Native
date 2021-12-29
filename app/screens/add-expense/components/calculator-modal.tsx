import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Modal from "react-native-modal"
import { Calculator } from "react-native-calculator"
const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height

export const CalculatorModal = ({ closeModal, getExpenseTotal, currentTotal }) => {
  const getTotalExpense = (value) => {
    getExpenseTotal(value)
    closeModal()
  }
  return (
    <View>
      <Modal isVisible={true} onBackdropPress={() => closeModal()}>
        <View style={CalculatorModalStyle.BASE}>
          <Calculator
            style={{ flex: 1 }}
            displayColor={"green"}
            hasAcceptButton={true}
            value={currentTotal}
            onAccept={(value) => getTotalExpense(value.toString())}
          />
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
    maxHeight: deviceHeight / 2,
    padding: 15,
    justifyContent: "center",
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
