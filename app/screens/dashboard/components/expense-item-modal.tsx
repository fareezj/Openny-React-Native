import React, { useState, useEffect } from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Text } from "../../../components"
import Modal from "react-native-modal"
import { useStores } from "../../../models"
import { ExpenseItemData } from "../../../utils/types"
import { CategoryImages } from "../../add-expense/constants/category-data"
import { useIsFocused } from "@react-navigation/core"
import { CurrencyFormatter } from "../../../utils/currency"

export const ExpenseItemModal = ({ closeModal, id }) => {
  const isFocused = useIsFocused()
  const { expenseStore, expenseCategoryStore } = useStores()

  const [expenseDetails, setExpenseDetails] = useState<ExpenseItemData[]>()
  const [expenseCategoryDetails, setExpenseCategoryDetails] = useState([])

  useEffect(() => {
    if (isFocused) {
      const data = expenseStore.getExpense(id)
      setExpenseDetails(data)
    }
  }, [isFocused])

  useEffect(() => {
    if (expenseDetails?.length > 0) {
      const categoryDetails = expenseCategoryStore.getExpenseCategory(expenseDetails[0].category)
      setExpenseCategoryDetails(categoryDetails)
    }
  }, [expenseDetails])

  const deleteExpense = () => {
    expenseStore.deleteExpense(expenseDetails[0].id)
    closeModal()
  }

  return (
    <View>
      <Modal isVisible={true} onBackdropPress={() => closeModal()}>
        {expenseDetails?.length > 0 && expenseCategoryDetails?.length > 0 ? (
          <View style={ExpenseItemModalStyle.BASE}>
            <View style={ExpenseItemModalStyle.CONTAINER}>
              <Text preset="header" text="Expense Item" />
              <View style={ExpenseItemModalStyle.CATEGORY_BASE}>
                <Image
                  style={ExpenseItemModalStyle.CATEGORY_IMAGE}
                  source={CategoryImages[expenseCategoryDetails[0].categoryImage].image}
                />
                <Text
                  preset="header"
                  style={ExpenseItemModalStyle.CATEGORY_TEXT}
                  text={expenseCategoryDetails[0].categoryName}
                />
              </View>
              <View style={ExpenseItemModalStyle.DETAILS_BASE}>
                <View style={ExpenseItemModalStyle.DETAILS_CONTENT}>
                  <Text preset="fieldLabel" text={"TOTAL EXPENSES: "} />
                  <Text preset="header" text={CurrencyFormatter(expenseDetails[0]?.total)} />
                </View>
                <View style={ExpenseItemModalStyle.DETAILS_CONTENT}>
                  <Text preset="fieldLabel" text={"EXPENSE DATE: "} />
                  <Text preset="header" text={expenseDetails[0]?.date} />
                </View>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity onPress={() => deleteExpense()}>
                <Image
                  source={require("../../../../assets/trash.png")}
                  style={ExpenseItemModalStyle.TRASH_ICON}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </Modal>
    </View>
  )
}

const ExpenseItemModalStyle = StyleSheet.create({
  DETAILS_BASE: {
    marginTop: 25,
  },
  DETAILS_CONTENT: {
    flexDirection: "row",
    alignItems: "center",
  },
  CONTAINER: {
    flexDirection: "column",
  },
  CATEGORY_BASE: {
    flexDirection: "row",
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  CATEGORY_CONTENT: {
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 72,
    minWidth: 72,
    borderWidth: 0,
  },
  CATEGORY_TEXT: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
    paddingStart: 20,
  },
  CATEGORY_IMAGE: {
    width: 50,
    height: 50,
  },
  TRASH_ICON: {
    width: 40,
    height: 40,
  },
  BASE: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "white",
    maxHeight: 400,
    maxWidth: 400,
    padding: 15,
    justifyContent: "space-between",
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
