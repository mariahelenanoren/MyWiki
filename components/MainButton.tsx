import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colorPalette, globalStyles } from "../styling";

interface Props {
  onPress: () => void;
  title: string;
  styles?: any;
}

export default function MainButton(props: Props) {
  return (
    <TouchableOpacity style={styles.mainButton} onPress={() => props.onPress()}>
      <Text style={{ ...styles.buttonTitle, ...globalStyles.text }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainButton: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    bottom: 0,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colorPalette.primaryColor,
  },
  buttonTitle: {
    fontWeight: "600",
    color: "#ffff",
  },
});
