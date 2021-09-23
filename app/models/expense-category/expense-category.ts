import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ExpenseCategoryModel = types.model("ExpenseCategory").props({
  categoryID: types.maybe(types.string),
  categoryName: types.maybe(types.string),
  categoryImage: types.maybe(types.integer),
})

type ExpenseCategoryType = Instance<typeof ExpenseCategoryModel>
export interface ExpenseCategory extends ExpenseCategoryType {}
type ExpenseCategorySnapshotType = SnapshotOut<typeof ExpenseCategoryModel>
export interface ExpenseCategorySnapshot extends ExpenseCategorySnapshotType {}
export const createExpenseCategoryDefaultModel = () => types.optional(ExpenseCategoryModel, {})
