import React, { useState, useEffect } from "react"
import {
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { Screen, Text } from "../../../components"
import Modal from "react-native-modal"
import R from "ramda"
import { CategoryItemData } from "../../../utils/types"
import { useStores } from "../../../models"
import { CategoryEnum } from "../../../utils/category-images"
import { CategoryImages } from "../constants/category-data"

export const CategoryModal = ({ closeModal, chosenCategory }) => {
  const { expenseCategoryStore } = useStores()
  const { expenseCategories } = expenseCategoryStore
  let arrangedCategory = R.splitEvery(4, expenseCategories)

  const onChooseCategory = (val) => {
    chosenCategory(val)
    closeModal()
  }

  const CategoryItem = ({ item }: { item: CategoryItemData[] }) => {
    return (
      <View style={CategoryModalStyle.CATEGORY_BASE}>
        {item.map((val, index) => {
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
        </View>
      </Modal>
    </View>
  )
}

const CategoryModalStyle = StyleSheet.create({
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
    borderWidth: 1,
    backgroundColor: "white",
    maxHeight: 400,
    maxWidth: 400,
    padding: 15,
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
