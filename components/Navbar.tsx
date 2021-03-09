import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorPalette } from "../helper";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Icon
        style={styles.icon}
        name="add-circle"
        color={colorPalette.primaryColor}
      />
      <Text style={styles.navTitle}>Projects</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "relative",
    display: "flex",
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderBottomWidth: 1,
    borderBottomColor: "#CBCBCB",
  },
  navTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
  },
  icon: {
    position: "absolute",
    right: 35,
    fontSize: 40,
  },
});
