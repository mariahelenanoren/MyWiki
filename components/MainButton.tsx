import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colorPalette, globalStyles } from "../styling";

interface Props {
  handlePress: () => void;
  title: string;
}

export default function MainButton(props: Props) {
  return (
    <TouchableOpacity style={styles.mainButton}>
      <Text style={{ ...styles.buttonTitle, ...globalStyles.text }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainButton: {
    display: "flex",
    alignItems: "center",
    bottom: 0,
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: colorPalette.primaryColor,
  },
  buttonTitle: {
    fontWeight: "600",
    color: "#ffff",
  },
});
