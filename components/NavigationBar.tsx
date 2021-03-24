import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles, colorPalette } from "../styling";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "react-router-native";

interface Props {
  title: string;
  path: string;
  level?: number;
  icon?: string;
}

export default function NavigationBar(props: Props) {
  const [iconState, setIconState] = useState({
    isSelected: false,
  });
  const [iconColor, setIconColor] = useState({
    color: colorPalette.secondaryColor,
  });

  function toggleIcon() {
    setIconState({ isSelected: !iconState.isSelected });
    {
      iconState.isSelected
        ? setIconColor({ color: colorPalette.secondaryColor })
        : setIconColor({ color: colorPalette.primaryColor });
    }
  }

  return (
    <Link
      to={{
        pathname: props.path,
        state: { title: props.title, navbarType: "defaultNavbar" },
      }}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.titleContainer}>
          {props.icon ? (
            <Icon
              name={props.icon}
              style={{ ...styles.buttonIcon, color: iconColor.color }}
              onPress={toggleIcon}
            />
          ) : null}
          {props.level ? (
            <Text
              style={{
                ...globalStyles.text,
                ...styles.title,
                marginLeft: props.level * 10,
              }}
            >
              {props.title}
            </Text>
          ) : (
            <Text style={{ ...globalStyles.text, ...styles.title }}>
              {props.title}
            </Text>
          )}
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
  buttonIcon: {
    marginRight: 8,
    fontSize: 20,
  },
  navIcon: {
    fontSize: 15,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {},
});
