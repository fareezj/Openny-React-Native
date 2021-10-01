import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { ExpenseCategoryStoreModel } from "../expense-category-store/expense-category-store"
import { ExpenseStoreModel } from "../expense-store/expense-store"
import { UserStoreModel } from "../user-store/user-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  expenseStore: types.optional(ExpenseStoreModel, {} as any),
  expenseCategoryStore: types.optional(ExpenseCategoryStoreModel, {} as any),
  userStore: types.optional(UserStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
