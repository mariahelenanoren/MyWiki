import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colorPalette } from "../styling";

interface Props {
  title: string;
}

export default function ProjectCard(props: Props) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.projectTitle}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 120,
    backgroundColor: colorPalette.primaryColor,
  },
  projectTitle: {
    fontSize: 20,
    color: "#ffff",
    fontWeight: "500",
  },
});
