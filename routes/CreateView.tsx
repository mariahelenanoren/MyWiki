import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link, useRouteMatch } from "react-router-native";
import Input from "../components/Input";
import { globalStyles } from "../styling";
import NavigationBar from "../components/NavigationBar";
import MainButton from "../components/MainButton";

export default function CreateView() {
  let { url } = useRouteMatch();

  function onChange(value: string) {}
  function createProject() {}

  return (
    <View style={styles.mainContainer}>
      <Input
        onChange={(value) => onChange(value)}
        placeholder="Project title"
      />
      <Input
        onChange={(value) => onChange(value)}
        placeholder="Project description"
      />
      <Text style={{ ...globalStyles.text, paddingVertical: 15 }}>
        Project color
      </Text>
      <View style={{ marginTop: 60 }}>
        <Text
          style={{
            ...globalStyles.title,
            textAlign: "center",
            marginBottom: 25,
            ...globalStyles.semiBold,
          }}
        >
          Add material
        </Text>
        <Link
          to={{
            pathname: url + "/images",
            state: { title: "Images", navbarType: "defaultNavbar" },
          }}
        >
          <NavigationBar title="Images" />
        </Link>
        <Link
          to={{
            pathname: url + "/wikipedia",
            state: { title: "Wikipedia", navbarType: "defaultNavbar" },
          }}
        >
          <NavigationBar title="Wikipedia" />
        </Link>
        <Link
          to={{
            pathname: url + "/articles",
            state: { title: "News articles", navbarType: "defaultNavbar" },
          }}
        >
          <NavigationBar title="News articles" />
        </Link>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton title="Create project" handlePress={() => createProject} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 35,
    paddingHorizontal: 35,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
