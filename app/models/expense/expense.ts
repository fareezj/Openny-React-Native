import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ExpenseModel = types.model("Expense").props({
  id: types.maybe(types.string),
  total: types.maybe(types.string),
  category: types.maybe(types.string),
  date: types.maybe(types.string),
})

type ExpenseType = Instance<typeof ExpenseModel>
export interface Expense extends ExpenseType {}
type ExpenseSnapshotType = SnapshotOut<typeof ExpenseModel>
export interface ExpenseSnapshot extends ExpenseSnapshotType {}
export const createExpenseDefaultModel = () => types.optional(ExpenseModel, {})
