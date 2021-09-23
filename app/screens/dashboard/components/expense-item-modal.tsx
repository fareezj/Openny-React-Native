import React, { useState, useEffect } from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Button, Text } from "../../../components"
import Modal from "react-native-modal"
import { useStores } from "../../../models"
import { ExpenseItemData } from "../../../utils/types"
import { CategoryImages } from "../../add-expense/constants/category-data"
import { useIsFocused } from "@react-navigation/core"
import { CurrencyFormatter } from "../../../utils/currency"
import { CalculatorModal } from "../../add-expense/components/calculator-modal"
import { CalendarModal } from "../../add-expense/components/calendar-modal"

export const ExpenseItemModal = ({ closeModal, id }) => {
  const isFocused = useIsFocused()
  const { expenseStore, expenseCategoryStore } = useStores()

  const [expenseDetails, setExpenseDetails] = useState<ExpenseItemData[]>()
  const [expenseCategoryDetails, setExpenseCategoryDetails] = useState([])
  const [showCalculatorModal, setShowCalculatorModal] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [expenseTotal, setExpenseTotal] = useState("")
  const [chosenDate, setChosenDate] = useState("")
  const [updateExpenseData, setUpdateExpenseData] = useState({
    id: "",
    category: "",
    total: "",
    date: "",
  })

  useEffect(() => {
    if (isFocused) {
      const data = expenseStore.getExpense(id)
      setExpenseDetails(data)
    }
  }, [isFocused])

  // Set init values
  useEffect(() => {
    if (expenseDetails?.length > 0) {
      setUpdateExpenseData({
        id: expenseDetails[0].id,
        category: expenseDetails[0].category,
        total: expenseDetails[0].total,
        date: expenseDetails[0].date,
      })
    }
  }, [expenseDetails])

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

  const onChangeData = (key, value) => {
    const temp = { ...updateExpenseData }
    temp.id = expenseDetails[0].id
    temp.category = expenseDetails[0].category
    temp[key] = value
    setUpdateExpenseData(temp)
  }

  const onUpdateExpenseItem = () => {
    let refinedReq = []
    refinedReq.push(updateExpenseData)
    expenseStore.editExpense(expenseDetails[0].id, refinedReq)
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={ExpenseItemModalStyle.DETAILS_TEXT}
                      text={
                        expenseTotal !== ""
                          ? CurrencyFormatter(expenseTotal)
                          : CurrencyFormatter(expenseDetails[0]?.total)
                      }
                    />
                    <TouchableOpacity onPress={() => setShowCalculatorModal(true)}>
                      <Image
                        style={ExpenseItemModalStyle.ITEM_ICON}
                        source={require("../../../../assets/calculator.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={ExpenseItemModalStyle.DETAILS_CONTENT}>
                  <Text preset="fieldLabel" text={"EXPENSE DATE: "} />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={ExpenseItemModalStyle.DETAILS_TEXT}
                      text={chosenDate !== "" ? chosenDate : expenseDetails[0].date}
                    />
                    <TouchableOpacity onPress={() => setShowCalendarModal(true)}>
                      <Image
                        style={ExpenseItemModalStyle.ITEM_ICON}
                        source={require("../../../../assets/calendar.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <View style={{ flexDirection: "row" }}>
                <Button text="Done Edit" onPress={() => onUpdateExpenseItem()} />
                <TouchableOpacity onPress={() => deleteExpense()}>
                  <Image
                    source={require("../../../../assets/trash.png")}
                    style={ExpenseItemModalStyle.TRASH_ICON}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
        {showCalculatorModal ? (
          <CalculatorModal
            closeModal={() => setShowCalculatorModal(false)}
            getExpenseTotal={(val) => {
              setExpenseTotal(val)
              onChangeData("total", val)
            }}
            currentTotal={expenseTotal}
          />
        ) : null}
        {showCalendarModal ? (
          <CalendarModal
            closeModal={() => setShowCalendarModal(false)}
            chosenDate={(val) => {
              setChosenDate(val)
              onChangeData("date", val)
            }}
          />
        ) : null}
      </Modal>
    </View>
  )
}

const ExpenseItemModalStyle = StyleSheet.create({
  ITEM_ICON: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  DETAILS_BASE: {
    marginTop: 25,
  },
  DETAILS_CONTENT: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  DETAILS_TEXT: {
    borderWidth: 1,
    fontSize: 18,
    color: "black",
    padding: 8,
    marginVertical: 12,
    borderRadius: 10,
    minWidth: "80%",
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
