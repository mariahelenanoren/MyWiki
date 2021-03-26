import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useRouteMatch } from "react-router-native";
import Input from "../components/Input";
import { globalStyles } from "../styling";
import NavigationBar from "../components/NavigationBar";
import MainButton from "../components/MainButton";
import { ProjectContext } from "../contexts/ProjectContext";
import { ProjectListContext } from "../contexts/ProjectListContext";

export default function CreateView() {
  const { url } = useRouteMatch();
  const { project, setProjectInformation } = useContext(ProjectContext);
  const { addProject } = useContext(ProjectListContext);

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.mainContainer, ...globalStyles.flex }}
    >
      <Input
        onChange={(value) => setProjectInformation("title", value)}
        placeholder="Project title"
      />
      <Input
        onChange={(value) => setProjectInformation("description", value)}
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
        <NavigationBar path={url + "/wikipedia"} title="Wikipedia" />
        <NavigationBar path={url + "/news-articles"} title="News articles" />
      </View>
      <View style={{ ...styles.buttonContainer, ...globalStyles.flex }}>
        <MainButton
          title="Create project"
          onPress={() => addProject(project)}
        />
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
