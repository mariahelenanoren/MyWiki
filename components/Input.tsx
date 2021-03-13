import React, { useState } from "react";
import { TextInput, StyleSheet, StyleProp, TextStyle } from "react-native";
import { globalStyles, colorPalette } from "../styling";

interface Props {
  onChange: (value: string) => void;
  placeholder: string;
}

export default function Input(props: Props) {
  const [inputStyle, setInputStyle] = useState<StyleProp<any>>({
    backgroundColor: colorPalette.secondaryColor,
    borderColor: colorPalette.borderColor,
  });

  function changeStylingOnFocus() {
    setInputStyle({
      backgroundColor: colorPalette.defaultColor,
      borderColor: colorPalette.primaryColor,
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
      placeholderTextColor={colorPalette.secondaryTextColor}
      onFocus={changeStylingOnFocus}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
});
