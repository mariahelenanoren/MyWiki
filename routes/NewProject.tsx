import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Input from "../components/Input";
import NavigationButton from "../components/NavigationButton";
import { globalStyles } from "../styling";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MainContainer() {
  function onChange(value: string) {}

  return (
    <View style={styles.view}>
      <Input
        onChange={(value) => onChange(value)}
        placeholder="Project title"
      />
      <Input
        onChange={(value) => onChange(value)}
        placeholder="Project description"
      />
      <Text style={globalStyles.text}>Project color</Text>
      <View style={{ marginTop: 40 }}>
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
        <NavigationButton icon="check-box" title="Images" />
        <NavigationButton title="Wikipedia" />
        <NavigationButton title="News articles" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingVertical: 35,
    paddingHorizontal: 35,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
});
