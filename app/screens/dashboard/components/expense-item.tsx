import React from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { Text } from "../../../components"
import { ExpenseItemData } from "../../../utils/types"
import { CategoryData, CategoryImages } from "../../add-expense/constants/category-data"
import { CurrencyFormatter } from "../../../utils/currency"

export const ExpenseItem = ({
  id,
  total,
  category,
  date,
  onClickDetail,
}: {
  id: string
  total: string
  category: string
  date: string
  onClickDetail: (data: string) => void
}) => {
  return (
    <View style={ExpenseStyle.BASE}>
      <TouchableOpacity onPress={() => onClickDetail(id)}>
        <View style={ExpenseStyle.CONTAINER}>
          <ExpenseCategory id={category} />
          <Text style={ExpenseStyle.TOTAL} text={CurrencyFormatter(total)} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const ExpenseCategory = ({ id }: { id: string }) => {
  return (
    <View>
      {CategoryData.map((val) =>
        val.categoryID === id ? (
          <View style={{ flexDirection: "row", alignItems: "center" }} key={id}>
            <Image style={ExpenseStyle.ICON} source={CategoryImages[val.categoryImage].image} />
            <Text style={ExpenseStyle.NAME} text={val.categoryName} />
          </View>
        ) : null,
      )}
    </View>
  )
}

const ExpenseStyle = StyleSheet.create({
  BASE: {
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 25,
    marginVertical: 10,
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
    maxWidth: 110,
  },
})
