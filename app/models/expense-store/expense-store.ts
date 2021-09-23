import { destroy, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { ExpenseModel } from "../expense/expense"

export const ExpenseStoreModel = types
  .model("ExpenseStore")
  .props({
    expenses: types.optional(types.array(ExpenseModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveExpense: (data) => {
      self.expenses.push(data)
    },
    getExpense: (id) => {
      return self.expenses.filter((val) => val.id === id)
    },
    deleteExpense: (id) => {
      self.expenses.map((val) => {
        if (val.id === id) {
          destroy(val)
        }
      })
    },
    clearAllExpenses: () => {
      self.expenses.clear()
    },
  }))

type ExpenseStoreType = Instance<typeof ExpenseStoreModel>
export interface ExpenseStore extends ExpenseStoreType {}
type ExpenseStoreSnapshotType = SnapshotOut<typeof ExpenseStoreModel>
export interface ExpenseStoreSnapshot extends ExpenseStoreSnapshotType {}
export const createExpenseStoreDefaultModel = () => types.optional(ExpenseStoreModel, {})
