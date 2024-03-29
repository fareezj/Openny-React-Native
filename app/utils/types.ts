import { ImageProps } from "react-native"

export interface ExpenseItemData {
  id: string
  total: string
  category: string
  date: string
  colourCode: string
}

export interface CategoryItemData {
  categoryID: string
  categoryName: string
  categoryImage: number
}
