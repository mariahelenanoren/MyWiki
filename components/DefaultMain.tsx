import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MainContainer() {
  return (
    <View style={styles.view}>
      <Text>Default</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
});
