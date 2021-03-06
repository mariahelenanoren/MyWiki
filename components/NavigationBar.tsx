import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles, colorPalette } from "../styling";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "react-router-native";

interface Props {
  title: string;
  path: string;
  navigationProps?: unknown;
}

export default function NavigationBar(props: Props) {
  return (
    <Link
      to={{
        pathname: props.path,
        state: {
          title: props.title,
          navbarType: "defaultNavbar",
          navigationProps: props.navigationProps,
        },
      }}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.titleContainer}>
          <Text style={globalStyles.text}>{props.title}</Text>
        </View>
        <Icon name="arrow-forward-ios" style={styles.navIcon} />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderColor: colorPalette.borderColor,
  },
  navIcon: {
    fontSize: 15,
  },
  titleContainer: {
    flex: 1,
    display: "flex",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
