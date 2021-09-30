import React, { useState, useEffect } from "react"
import {
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { Screen, Text, Button } from "../../../components"
import Modal from "react-native-modal"
import { CategoryImages } from "../constants/category-data"
import { ExpenseCategory } from "../../../models/expense-category/expense-category"
import { useStores } from "../../../models"
import { onSnapshot } from "mobx-state-tree"

export const AddCategoryModal = ({ closeModal }) => {
  const { expenseCategoryStore } = useStores()
  const { expenseCategories } = expenseCategoryStore
  const [categoryName, setCategoryName] = useState<string>("")
  const [addCategoryReqBody, setAddCategoryReqBody] = useState<ExpenseCategory>({
    categoryID: "",
    categoryName: "",
    categoryImage: 0,
  })

  const reqBodyBuilder = (key, value) => {
    const temp = { ...addCategoryReqBody }
    console.log(key, value)
    temp["categoryID"] = (expenseCategories.length + 1).toString()
    temp[key] = value
    setAddCategoryReqBody(temp)
  }

  function addNewCategory() {
    console.log(addCategoryReqBody)
    expenseCategoryStore.saveExpenseCategories(addCategoryReqBody)
  }

  return (
    <View>
      <Modal isVisible={true} onBackdropPress={() => closeModal()}>
        <View style={AddCategoryStyle.BASE}>
          <View style={AddCategoryStyle.CONTENT}>
            <View style={AddCategoryStyle.CATEGORY_BASE}>
              <Text
                preset="fieldLabel"
                text="Category Name"
                numberOfLines={2}
                style={AddCategoryStyle.TEXT_TITLE}
              />
              <TextInput
                placeholder="Add Category Name"
                style={AddCategoryStyle.TEXT_INPUT}
                value={addCategoryReqBody.categoryName}
                onChangeText={(val) => reqBodyBuilder("categoryName", val)}
              />
            </View>
            <View>
              <Text
                preset="fieldLabel"
                text="Pick Category Icon"
                style={AddCategoryStyle.PICK_TITLE}
              />
              <View style={AddCategoryStyle.PICK_ICON_BASE}>
                <CategoryIconListing
                  choosenCategoryImage={(id: number) => {
                    reqBodyBuilder("categoryImage", id)
                  }}
                />
              </View>
            </View>
            <View style={AddCategoryStyle.ADD_BASE}>
              <Button
                text="Add New Category"
                textStyle={AddCategoryStyle.ADD_TEXT}
                onPress={() => addNewCategory()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const CategoryIconListing = ({
  choosenCategoryImage,
}: {
  choosenCategoryImage: (id: number) => void
}) => {
  const [choosenCatIcon, setChoosenCatIcon] = useState<number>(0)
  return (
    <ScrollView>
      <View style={AddCategoryStyle.SCROLL_BASE}>
        {CategoryImages.length > 0
          ? CategoryImages.map((val, index) => {
              return (
                <CategoryImageBuilder
                  key={index}
                  id={index}
                  choosenIcon={choosenCatIcon}
                  onChooseIcon={(id: number) => {
                    setChoosenCatIcon(id)
                    choosenCategoryImage(id)
                  }}
                />
              )
            })
          : null}
      </View>
    </ScrollView>
  )
}

const CategoryImageBuilder = ({
  id,
  choosenIcon,
  onChooseIcon,
}: {
  id: number
  choosenIcon: number
  onChooseIcon: (data: number) => void
}) => {
  return (
    <View
      style={[
        AddCategoryStyle.ICON_BASE,
        { backgroundColor: id === choosenIcon ? "blue" : "white" },
      ]}
    >
      <TouchableOpacity onPress={() => onChooseIcon(id)}>
        <Image source={CategoryImages[id].image} style={AddCategoryStyle.ICON_IMAGE} />
      </TouchableOpacity>
    </View>
  )
}

const AddCategoryStyle = StyleSheet.create({
  ADD_BASE: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  ADD_TEXT: {
    fontSize: 12,
    fontWeight: "bold",
  },
  SCROLL_BASE: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 6,
  },
  ICON_BASE: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
  },
  ICON_IMAGE: {
    width: 40,
    height: 40,
  },
  PICK_ICON_BASE: {
    borderWidth: 1,
    minHeight: 220,
    maxHeight: 220,
  },
  TEXT_TITLE: {
    maxWidth: 100,
    fontSize: 16,
  },
  PICK_TITLE: {
    maxWidth: "100%",
    fontSize: 16,
    marginTop: 20,
  },
  TEXT_INPUT: {
    backgroundColor: "white",
    height: "100%",
    maxWidth: "70%",
    minWidth: "70%",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 15,
    borderRadius: 10,
  },
  CATEGORY_BASE: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    justifyContent: "space-between",
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
  },
})
