import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, RouteComponentProps, withRouter } from "react-router-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorPalette } from "../helper";

interface Navigation {
  title: string;
}
interface Props extends RouteComponentProps<{}, {}, Navigation> {}

function Navbar(props: Props) {
  return (
    <View style={styles.navbar}>
      <Link
        style={styles.iconLink}
        to={{
          pathname: "/new-project",
          state: {
            title: "New Project",
          },
        }}
      >
        <Icon
          style={styles.icon}
          name="add-circle"
          color={colorPalette.primaryColor}
        />
      </Link>
      <Text style={styles.navTitle}>
        {props.location.state ? props.location.state.title : "Projects"}
      </Text>
    </View>
  );
}

export default withRouter(Navbar);

const styles = StyleSheet.create({
  navbar: {
    position: "relative",
    display: "flex",
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderBottomWidth: 1,
    borderBottomColor: "#CBCBCB",
  },
  navTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
  },
  iconLink: {
    position: "absolute",
    right: 35,
    backgroundColor: "transparent",
    zIndex: 100,
  },
  icon: {
    fontSize: 40,
  },
});
