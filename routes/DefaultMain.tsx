import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import { getProjects } from "../helper";
import { colorPalette } from "../helper";

export default function MainContainer() {
  let data;
  getProjects()
    .then((results) => {
      if (results.length !== 0) {
        data = results;
      } else {
        data = null;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  if (data) {
    return <Text>Projects</Text>;
  } else {
    return (
      <View style={styles.defaultView}>
        <Text>You dont have any projects</Text>
        <Link
          to={{
            pathname: "/new-project",
            state: { title: "New project", navbarType: "defaultNavbar" },
          }}
        >
          <Text style={styles.link}>Click here to create one</Text>
        </Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  defaultView: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  link: {
    color: colorPalette.primaryColor,
    textDecorationLine: "underline",
    textDecorationColor: colorPalette.primaryColor,
    textDecorationStyle: "solid",
  },
});
