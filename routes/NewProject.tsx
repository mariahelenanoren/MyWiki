import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Input from "../components/Input";
import { globalStyles } from "../styling";
import NavigationBar from "../components/NavigationBar";
import MainButton from "../components/MainButton";

export default function MainContainer() {
  function onChange(value: string) {}

  function createProject() {}

  return (
    <View style={styles.mainContainer}>
      <Input
        onChange={(value) => onChange(value)}
        placeholder="Project title"
      />
      <Input
        onChange={(value) => onChange(value)}
        placeholder="Project description"
      />
      <Text style={{ ...globalStyles.text, paddingVertical: 15 }}>
        Project color
      </Text>
      <View style={{ marginTop: 60 }}>
        <Text
          style={{
            ...globalStyles.title,
            textAlign: "center",
            marginBottom: 25,
            ...globalStyles.semiBold,
          }}
        >
          Add material
        </Text>
        <NavigationBar title="Images" />
        <NavigationBar title="Wikipedia" />
        <NavigationBar title="News articles" />
      </View>
      <View style={styles.buttonContainer}>
        <MainButton title="Create project" handlePress={() => createProject} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 35,
    paddingHorizontal: 35,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
