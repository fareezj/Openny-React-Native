import React, { useState } from "react"
import { ScrollView, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Text } from "../../../components"
import Modal from "react-native-modal"
import R from "ramda"
import { CategoryItemData } from "../../../utils/types"
import { useStores } from "../../../models"
import { CategoryImages } from "../constants/category-data"
import { AddCategoryModal } from "./add-category-modal"

export const CategoryModal = ({ closeModal, chosenCategory }) => {
  const { expenseCategoryStore } = useStores()
  const { expenseCategories } = expenseCategoryStore
  const [showAddCategoryModal, setShowCategoryModal] = useState(false)
  let arrangedCategory = R.splitEvery(4, expenseCategories)

  const onChooseCategory = (val) => {
    chosenCategory(val)
    closeModal()
  }

  const CategoryItem = ({ item }: { item: CategoryItemData[] }) => {
    return (
      <View style={CategoryModalStyle.CATEGORY_BASE}>
        {item.map((val, index) => {
          console.log(item[index].categoryImage)
          return (
            <TouchableOpacity
              onPress={() => onChooseCategory(item[index].categoryID)}
              key={item[index].categoryID}
            >
              <View style={CategoryModalStyle.CATEGORY_CONTENT}>
                <Image
                  style={CategoryModalStyle.CATEGORY_IMAGE}
                  source={CategoryImages[item[index].categoryImage].image}
                />

                <Text
                  numberOfLines={1}
                  style={CategoryModalStyle.CATEGORY_TEXT}
                  text={item[index].categoryName}
                />
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  return (
    <View>
      <Modal isVisible={true} onBackdropPress={() => closeModal()}>
        <View style={CategoryModalStyle.BASE}>
          <ScrollView style={CategoryModalStyle.CONTENT} bounces={false}>
            {arrangedCategory.length > 0
              ? arrangedCategory.map((val, index) => {
                  return <CategoryItem item={val} key={index} />
                })
              : null}
          </ScrollView>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={() => setShowCategoryModal(true)}>
              <Image
                style={CategoryModalStyle.ADD_ICON}
                source={require("../../../../assets/add.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        {showAddCategoryModal ? (
          <AddCategoryModal closeModal={() => setShowCategoryModal(false)} />
        ) : null}
      </Modal>
    </View>
  )
}

const CategoryModalStyle = StyleSheet.create({
  ADD_ICON: {
    width: 35,
    height: 35,
  },
  CATEGORY_BASE: {
    flexDirection: "row",
    borderWidth: 0,
    marginTop: 15,
    justifyContent: "space-between",
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
    fontSize: 14,
  },
  CATEGORY_IMAGE: {
    width: 40,
    height: 40,
  },
  BASE: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    maxHeight: 400,
    maxWidth: 400,
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
  },
  CONTENT: {
    flex: 1,
    borderWidth: 0,
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
