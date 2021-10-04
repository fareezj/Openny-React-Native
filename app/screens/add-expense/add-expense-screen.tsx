import React, { useState } from "react"
import { View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { CalculatorModal } from "./components/calculator-modal"
import { CurrencyFormatter } from "../../utils/currency"
import { CategoryModal } from "./components/category-modal"
import { CategoryImages } from "./constants/category-data"
import { CalendarModal } from "./components/calendar-modal"
import { useStores } from "../../models"
import { Expense } from "../../models/expense/expense"

export const AddExpenseScreen = () => {
  const navigation = useNavigation()
  const { expenseStore, expenseCategoryStore } = useStores()
  const { expenses } = expenseStore
  const { expenseCategories } = expenseCategoryStore

  const [showCalculatorModal, setShowCalculatorModal] = useState<boolean>(false)
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false)
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false)
  const [expenseTotal, setExpenseTotal] = useState<string>("")
  const [chosenCategory, setChosenCategory] = useState<string>("")
  const [chosenDate, setChosenDate] = useState<string>("")
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [newExpense, setNewExpense] = useState<Expense>({
    id: "",
    total: "",
    category: "",
    date: "",
    colourCode: "",
  })

  const onInputExpense = (key, value, action) => {
    if (action !== "clear") {
      const temp = { ...newExpense }
      temp.id = Math.random().toString()
      temp[key] = value
      if (key === "category") {
        let existingValue = expenses.find((val) => val.category === value)
        if (existingValue) {
          temp["colourCode"] = existingValue.colourCode
        } else {
          temp["colourCode"] = (
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16) +
            "000000"
          ).slice(0, 7)
        }
      }
      setNewExpense(temp)
      onInputValidation(temp)
    } else {
      const temp = { ...newExpense }
      Object.keys(temp).forEach((key) => {
        temp[key] = ""
      })
      setNewExpense(temp)
      onInputValidation(temp)
    }
  }

  const onInputValidation = (temp?: object) => {
    let isEmpty
    for (let i in temp) {
      if (temp[i] === "") {
        isEmpty = true
      }
    }
    console.log("stan", isEmpty)
    isEmpty ? setIsFormValid(false) : setIsFormValid(true)
  }

  const onAddExpense = () => {
    expenseStore.saveExpense(newExpense)
    //expenseStore.clearAllExpenses()
    resetInput()
  }

  const resetInput = () => {
    setExpenseTotal("")
    setChosenCategory("")
    setChosenDate("")
    onInputExpense("", "", "clear")
  }

  return (
    <View style={AddExpenseStyle.FULL}>
      <Screen style={AddExpenseStyle.CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <View style={AddExpenseStyle.HEADER_BASE}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../../assets/back-icon.png")}
              style={AddExpenseStyle.BACK_ICON}
            />
          </TouchableOpacity>
          <Text style={AddExpenseStyle.HEADER_TITLE} text="Add New Expense" />
        </View>
        <View style={AddExpenseStyle.FIELD_BASE}>
          <View style={AddExpenseStyle.FIELD_ROW}>
            <Text style={AddExpenseStyle.ROW_TITLE} numberOfLines={2} text="Total Expense" />
            <TextInput
              style={AddExpenseStyle.TEXT_INPUT}
              placeholder="Number"
              editable={false}
              value={CurrencyFormatter(expenseTotal)}
            />
            <TouchableOpacity onPress={() => setShowCalculatorModal(true)}>
              <Image
                source={require("../../../assets/calculator.png")}
                style={[AddExpenseStyle.BACK_ICON, { height: 30, width: 30 }]}
              />
            </TouchableOpacity>
          </View>
          <View style={AddExpenseStyle.FIELD_ROW}>
            <Text style={AddExpenseStyle.ROW_TITLE} numberOfLines={2} text="Expense Category" />
            <View style={AddExpenseStyle.TEXT_INPUT}>
              {expenseCategories.map((val) => console.log(val))}
              {expenseCategories
                .filter((val) => val.categoryID === chosenCategory)
                .map((val) => {
                  return (
                    <View style={AddExpenseStyle.CATEGORY_BASE} key={val.categoryID}>
                      <Image
                        style={AddExpenseStyle.CATEGORY_ICON}
                        source={CategoryImages[val.categoryImage].image}
                      />
                      <Text style={AddExpenseStyle.CATEGORY_TEXT} text={val.categoryName} />
                    </View>
                  )
                })}
            </View>
            <TouchableOpacity onPress={() => setShowCategoryModal(true)}>
              <Image
                source={require("../../../assets/folder.png")}
                style={[AddExpenseStyle.BACK_ICON, { height: 30, width: 30 }]}
              />
            </TouchableOpacity>
          </View>
          <View style={AddExpenseStyle.FIELD_ROW}>
            <Text style={AddExpenseStyle.ROW_TITLE} numberOfLines={2} text="Expense Date" />
            <TextInput
              style={AddExpenseStyle.TEXT_INPUT}
              editable={false}
              onChangeText={(val) => onInputExpense("date", val, "add")}
              value={chosenDate}
            />
            <TouchableOpacity onPress={() => setShowCalendarModal(true)}>
              <Image
                source={require("../../../assets/calendar.png")}
                style={[AddExpenseStyle.BACK_ICON, { height: 30, width: 30 }]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          disabled={!isFormValid}
          style={[{ ...AddExpenseStyle.ADD_BTN, backgroundColor: isFormValid ? "white" : "gray" }]}
          onPress={() => onAddExpense()}
        >
          <Text style={AddExpenseStyle.ADD_TEXT} text="Add Expense" />
        </TouchableOpacity>
      </Screen>
      {showCalculatorModal ? (
        <CalculatorModal
          closeModal={() => setShowCalculatorModal(false)}
          getExpenseTotal={(val) => {
            setExpenseTotal(val)
            onInputExpense("total", val, "add")
          }}
          currentTotal={expenseTotal}
        />
      ) : null}
      {showCategoryModal ? (
        <CategoryModal
          closeModal={() => setShowCategoryModal(false)}
          chosenCategory={(value) => {
            setChosenCategory(value)
            onInputExpense("category", value.toString(), "add")
          }}
        />
      ) : null}
      {showCalendarModal ? (
        <CalendarModal
          closeModal={() => setShowCalendarModal(false)}
          chosenDate={(val) => {
            setChosenDate(val)
            onInputExpense("date", val, "add")
          }}
        />
      ) : null}
    </View>
  )
}

const AddExpenseStyle = StyleSheet.create({
  ADD_BTN: {
    maxWidth: "100%",
    padding: 10,
    marginHorizontal: 90,
    marginTop: 80,
    borderRadius: 40,
  },
  ADD_TEXT: {
    color: "#0E164C",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  CATEGORY_BASE: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  CATEGORY_ICON: {
    width: 35,
    height: 35,
  },
  CATEGORY_TEXT: {
    fontSize: 16,
    color: "black",
    paddingStart: 5,
  },
  FULL: { flex: 1, backgroundColor: "#0E164C" },
  FIELD_BASE: {
    flexDirection: "column",
    marginTop: 40,
  },
  FIELD_ROW: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  TEXT_INPUT: {
    backgroundColor: "white",
    flexGrow: 1,
    height: "100%",
    paddingHorizontal: 20,
    marginRight: 15,
    borderRadius: 20,
  },
  ROW_TITLE: {
    maxWidth: 100,
    minWidth: 80,
    fontSize: 18,
    fontWeight: "500",
    marginRight: 13,
  },
  CONTAINER: {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
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
