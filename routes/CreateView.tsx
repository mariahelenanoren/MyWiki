import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Link, useRouteMatch } from "react-router-native";
import Input from "../components/Input";
import { globalStyles } from "../styling";
import NavigationBar from "../components/NavigationBar";
import MainButton from "../components/MainButton";

export default function CreateView() {
  const { url } = useRouteMatch();

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
        <NavigationBar path={url + "/images"} title="Images" />
        <NavigationBar title="Wikipedia" path={url + "/wikipedia"} />
        <NavigationBar path={url + "/news-articles"} title="News articles" />
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
