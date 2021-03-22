import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
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
    <ScrollView
      contentContainerStyle={{ ...styles.mainContainer, ...globalStyles.flex }}
    >
      <Input
        onChange={(value) => onChange(value)}
        placeholder="Project title"
      />
      <Input
        onChange={(value) => onChange(value)}
        placeholder="Project description"
      />
      <Text style={{ ...globalStyles.text, paddingVertical: 12 }}>
        Project color
      </Text>
      <View style={{ marginTop: 25 }}>
        <Text
          style={{
            ...globalStyles.title,
            textAlign: "center",
            marginBottom: 20,
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
      <View style={{ ...styles.buttonContainer, ...globalStyles.flex }}>
        <MainButton title="Create project" onPress={() => createProject} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    backgroundColor: "white",
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
