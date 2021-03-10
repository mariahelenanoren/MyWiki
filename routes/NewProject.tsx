import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Input from "../components/Input";
import { globalStyles } from "../styling";

export default function MainContainer() {
  function onChange(value: string) {
    console.log(value);
  }

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
            ...globalStyles.text,
            textAlign: "center",
            ...globalStyles.semiBold,
          }}
        >
          Add material
        </Text>
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
