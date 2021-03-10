import React from "react";
import { StyleSheet } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { colorPalette } from "../helper";
import MainNavbar from "./navbars/MainNavbar";
import DefaultNavbar from "./navbars/DefaultNavbar";

interface Navigation {
  title: string;
  navbarType: "mainNavbar" | "defaultNavbar" | "projectNavbar" | "detailNavbar";
}
interface Props extends RouteComponentProps<{}, {}, Navigation> {}

function Navbar(props: Props) {
  if (props.location.state) {
    if (props.location.state.navbarType === "mainNavbar") {
      return (
        <MainNavbar
          styles={styles}
          colorPalette={colorPalette}
          title={props.location.state.title}
        />
      );
    } else if (props.location.state.navbarType === "defaultNavbar") {
      return (
        <DefaultNavbar
          styles={styles}
          colorPalette={colorPalette}
          title={props.location.state.title}
        />
      );
    } else {
      return (
        <DefaultNavbar
          styles={styles}
          colorPalette={colorPalette}
          title={props.location.state.title}
        />
      );
    }
  } else {
    return (
      <MainNavbar
        styles={styles}
        colorPalette={colorPalette}
        title="Projects"
      />
    );
  }
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
    backgroundColor: "transparent",
    zIndex: 100,
  },
  icon: {
    fontSize: 40,
  },
});
