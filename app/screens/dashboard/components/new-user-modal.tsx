import React, { useState } from "react"
import { View, StyleSheet, Button } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import Modal from "react-native-modal"
import { Text } from "../../../components"
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
            <Text
              preset="fieldLabel"
              text="Welcome to Openny!"
              style={NewUserStyle.GREETING_TEXT}
            />
            <TextInput
              placeholder="Please enter your name"
              value={name}
              onChangeText={setName}
              style={NewUserStyle.TEXT_INPUT}
            />
            <View style={NewUserStyle.BUTTON}>
              <Button title="Okay!" onPress={() => addNewUser()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const NewUserStyle = StyleSheet.create({
  BUTTON: {
    width: "50%",
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: "center",
  },
  GREETING_TEXT: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  BASE: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "white",
    maxHeight: 200,
    maxWidth: 400,
    padding: 15,
    borderRadius: 20,
    justifyContent: "center",
  },
  CONTENT: {
    flex: 1,
    flexDirection: "column",
  },
  TEXT_INPUT: {
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 20,
  },
})
