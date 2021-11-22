import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."

export const UserModel = types
  .model("User")
  .props({
    id: types.maybe(types.string),
    name: types.maybe(types.string),
    image: types.maybe(types.string),
    darkMode: types.maybe(types.boolean),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUser: (data) => {
      self.id = data.id
      self.name = data.name
      self.image = data.image
      self.darkMode = false
    },
    toggleTheme: () => {
      self.darkMode = !self.darkMode
      console.log("woof")
    },
  }))
type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
