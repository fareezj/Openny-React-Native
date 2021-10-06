import { useNavigation } from "@react-navigation/core"
import React from "react"
import { View, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Text } from "../../components/text/text"

export const HeaderBack = ({ title }: { title: string }) => {
  const navigation = useNavigation()
  return (
    <View style={HeaderBackStyle.HEADER_BASE}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require("../../../assets/back-icon.png")}
          style={HeaderBackStyle.BACK_ICON}
        />
      </TouchableOpacity>
      <Text style={HeaderBackStyle.HEADER_TITLE} text={title} />
    </View>
  )
}

const HeaderBackStyle = StyleSheet.create({
  HEADER_BASE: {
    flexDirection: "row",
    alignItems: "center",
  },
  HEADER_TITLE: {
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  BACK_ICON: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: "white",
  },
})
