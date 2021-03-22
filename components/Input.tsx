import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { globalStyles, colorPalette } from "../styling";

interface Props {
  onChange: (value: string) => void;
  placeholder: string;
}

export default function Input(props: Props) {
  const [inputStyle, setInputStyle] = useState({
    backgroundColor: colorPalette.secondaryBgColor,
    borderColor: colorPalette.borderColor,
  });

  function changeStylingOnFocus() {
    setInputStyle({
      backgroundColor: colorPalette.primaryBgColor,
      borderColor: colorPalette.primaryColor,
    });
  }

  function changeStylingOnBlur() {
    setInputStyle({
      backgroundColor: colorPalette.secondaryBgColor,
      borderColor: colorPalette.borderColor,
    });
  }

  return (
    <TextInput
      style={{
        ...styles.input,
        ...globalStyles.text,
        backgroundColor: inputStyle.backgroundColor,
        borderColor: inputStyle.borderColor,
      }}
      onChangeText={(value) => props.onChange(value)}
      placeholder={props.placeholder}
      placeholderTextColor={colorPalette.secondaryColor}
      onFocus={changeStylingOnFocus}
      onBlur={changeStylingOnBlur}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
});
