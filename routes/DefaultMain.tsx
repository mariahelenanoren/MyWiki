import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getProjects } from "../helper";

export default function MainContainer() {
  if (getProjects()) {
    return <Text>Projects</Text>;
  } else {
    return (
      <View style={styles.view}>
        <Text>You dont have any projects</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
});
