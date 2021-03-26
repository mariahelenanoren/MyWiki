import React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorPalette } from "../../styling";

interface Props {
  title: string;
  styles: any;
}

function MainNavbar(props: Props) {
  return (
    <View style={props.styles.navbar}>
      <Link
        style={{ ...props.styles.iconLink, right: 35 }}
        to={{
          pathname: "/new-project",
          state: {
            title: "New Project",
            navbarType: "defaultNavbar",
          },
        }}
      >
        <Icon
          style={props.styles.icon}
          name="add-circle"
          color={colorPalette.primaryColor}
        />
      </Link>
      <Text style={props.styles.navTitle}>{props.title}</Text>
    </View>
  );
}

export default MainNavbar;
