import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles, colorPalette } from "../styling";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "react-router-native";

interface Props {
  title: string;
  path: string;
  iconPress: (iconToggle: boolean) => void;
  level?: string;
  icon: string;
  navigationProps?: unknown;
  isSelected: boolean;
}

export default function SelectionBar(props: Props) {
  const [iconToggle, setIconToggle] = useState(props.isSelected);
  const [iconColor, setIconColor] = useState({
    color: colorPalette.secondaryColor,
  });

  const handlePress = () => {
    setIconToggle(!iconToggle);
    props.iconPress(!iconToggle);
  };

  useEffect(() => {
    iconToggle
      ? setIconColor({ color: colorPalette.primaryColor })
      : setIconColor({ color: colorPalette.secondaryColor });
  }, [iconToggle]);

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
        <Icon
          name={props.icon}
          style={{ ...styles.buttonIcon, color: iconColor.color }}
          onPress={() => handlePress()}
        />
        <View style={styles.titleContainer}>
          {props.level ? (
            <Text
              style={{
                ...globalStyles.text,
                marginLeft: Number(props.level) * 10,
              }}
            >
              {props.title}
            </Text>
          ) : (
            <Text style={globalStyles.text}>{props.title}</Text>
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
    fontSize: 20,
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
