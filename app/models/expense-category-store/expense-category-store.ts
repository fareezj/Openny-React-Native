import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { ExpenseCategoryModel } from "../expense-category/expense-category"
import { ExpenseModel } from "../expense/expense"
import { R } from "ramda"

export const ExpenseCategoryStoreModel = types
  .model("ExpenseCategoryStore")
  .props({
    expenseCategories: types.optional(types.array(ExpenseCategoryModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveExpenseCategories: (data) => {
      self.expenseCategories.push(data)
    },
    getExpenseCategory: (id) => {
      return self.expenseCategories.filter((val) => val.categoryID === id)
    },
  }))

type ExpenseCategoryStoreType = Instance<typeof ExpenseCategoryStoreModel>
export interface ExpenseCategoryStore extends ExpenseCategoryStoreType {}
type ExpenseCategoryStoreSnapshotType = SnapshotOut<typeof ExpenseCategoryStoreModel>
export interface ExpenseCategoryStoreSnapshot extends ExpenseCategoryStoreSnapshotType {}
export const createExpenseCategoryStoreDefaultModel = () =>
  types.optional(ExpenseCategoryStoreModel, {})
