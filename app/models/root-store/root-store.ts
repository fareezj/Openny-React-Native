import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { ExpenseCategoryStoreModel } from "../expense-category-store/expense-category-store"
import { ExpenseCategoryModel } from "../expense-category/expense-category"
import { ExpenseStoreModel } from "../expense-store/expense-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  expenseStore: types.optional(ExpenseStoreModel, {} as any),
  expenseCategoryStore: types.optional(ExpenseCategoryStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
