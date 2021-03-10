import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { globalStyles, colorPalette } from "../styling";

interface Props {
  onChange: (value: string) => void;
  placeholder: string;
}

export default function Input(props: Props) {
  return (
    <TextInput
      style={{ ...styles.input, ...globalStyles.text }}
      onChangeText={(value) => props.onChange(value)}
      placeholder={props.placeholder}
      placeholderTextColor={colorPalette.secondaryTextColor}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colorPalette.secondaryColor,
    borderWidth: 1,
    borderColor: colorPalette.borderColor,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
});
