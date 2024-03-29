import React from "react"
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import { CategoryImages } from "../../add-expense/constants/category-data"
import { CurrencyFormatter } from "../../../utils/currency"
import { useStores } from "../../../models"
import { useTheme } from "../../../hooks/useTheme"

export const ExpenseItem = ({
  id,
  total,
  category,
  date,
  colourCode,
  onClickDetail,
}: {
  id: string
  total: string
  category: string
  date: string
  colourCode: string
  onClickDetail: (data: string) => void
}) => {
  return (
    <View style={[ExpenseStyle.BASE, { backgroundColor: colourCode }]}>
      <TouchableOpacity onPress={() => onClickDetail(id)}>
        <View style={ExpenseStyle.CONTAINER}>
          <ExpenseCategory id={category} colourCode={colourCode} />
          <Text style={[ExpenseStyle.TOTAL]}>{CurrencyFormatter(total)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const ExpenseCategory = ({ id, colourCode }: { id: string; colourCode: string }) => {
  const { expenseCategoryStore } = useStores()
  const { expenseCategories } = expenseCategoryStore

  return (
    <View>
      {expenseCategories.map((val) =>
        val.categoryID === id ? (
          <View style={{ flexDirection: "row", alignItems: "center" }} key={id}>
            <Image style={ExpenseStyle.ICON} source={CategoryImages[val.categoryImage].image} />
            <View style={[ExpenseStyle.CAT_COLOR, { backgroundColor: colourCode }]} />
            <Text style={ExpenseStyle.NAME}>{val.categoryName}</Text>
          </View>
        ) : null,
      )}
    </View>
  )
}

const ExpenseStyle = StyleSheet.create({
  CAT_COLOR: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginStart: 10,
  },
  BASE: {
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 25,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    elevation: 1,
    borderColor: "white",
  },
  CONTAINER: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  ICON: {
    width: 40,
    height: 40,
  },
  NAME: {
    color: "black",
    paddingStart: 15,
    maxWidth: 140,
  },
  TOTAL: {
    color: "black",
    maxWidth: 100,
  },
})
