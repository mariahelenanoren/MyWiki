import React, { useContext } from "react";
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
  const { project, setProjectInformation, removeImageSection } = useContext(
    ProjectContext
  );
  const { addProject } = useContext(ProjectListContext);

  console.log(project);

  const handlePress = (iconToggle: boolean, title: string) => {
    iconToggle ? null : removeImageSection(title);
  };

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
        <NavigationBar
          path={url + "/images"}
          title="Images"
          navigationProps={{ type: "search" }}
        />
        {project.imageSections.map((section) => (
          <NavigationBar
            key={section.title}
            title={section.title}
            path={url + "/images"}
            navigationProps={{ type: "view" }}
            icon={"check-box"}
            isSelected={true}
            iconPress={(iconToggle) => handlePress(iconToggle, section.title)}
          />
        ))}
        <NavigationBar
          path={url + "/wikipedia"}
          title="Wikipedia"
          navigationProps={{ type: "search" }}
        />
        <NavigationBar
          path={url + "/news-articles"}
          title="News articles"
          navigationProps={{ type: "search" }}
        />
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
