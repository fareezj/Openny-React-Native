import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import Modal from "react-native-modal"
import { Button, Text } from "../../../components"
import { useStores } from "../../../models"
import { User } from "../../../models/user/user"

export const NewUserModal = ({ closeModal }) => {
  const { userStore } = useStores()
  const [name, setName] = useState<string>("")
  const [nameReqBody, setNameReqBody] = useState<User>({
    id: "",
    name: "",
    image: "",
  })

  function addNewUser() {
    const temp = { ...nameReqBody }
    temp.id = Math.random().toString()
    temp.name = name
    temp.image = ""
    setNameReqBody(temp)
    userStore.saveUser(temp)
  }

  return (
    <View>
      <Modal isVisible={true} onBackdropPress={() => closeModal()}>
        <View style={NewUserStyle.BASE}>
          <View style={NewUserStyle.CONTENT}>
            <Text preset="fieldLabel" text="Welcome to Openny!" />
            <TextInput
              placeholder="Please enter your name"
              value={name}
              onChangeText={setName}
              style={NewUserStyle.TEXT_INPUT}
            />
            <Button text="Okay!" onPress={() => addNewUser()} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const NewUserStyle = StyleSheet.create({
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
  TEXT_INPUT: {
    backgroundColor: "white",
    maxWidth: "70%",
    minWidth: "70%",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 15,
    borderRadius: 10,
  },
})
