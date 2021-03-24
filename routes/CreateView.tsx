import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useRouteMatch } from "react-router-native";
import Input from "../components/Input";
import { globalStyles } from "../styling";
import NavigationBar from "../components/NavigationBar";
import MainButton from "../components/MainButton";
import { ProjectItem, WikipediaArticle } from "../contexts/ProjectContext";

export default function CreateView() {
  const [wikipediaArticles, setWikipediaArticles] = useState<
    WikipediaArticle[]
  >();
  const [newsArticles, setNewsArticles] = useState();
  const [project, setProject] = useState<ProjectItem>({
    title: "",
    images: [],
    wikipediaArticles: [],
    newsArticles: [],
  });
  const { url } = useRouteMatch();

  function onChange(key: string, value: string) {
    setProject({ ...project, [key]: value });
  }

  console.log(wikipediaArticles);

  function createProject() {}

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.mainContainer, ...globalStyles.flex }}
    >
      <Input
        onChange={(value) => onChange("title", value)}
        placeholder="Project title"
      />
      <Input
        onChange={(value) => onChange("description", value)}
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
        <NavigationBar
          path={url + "/wikipedia"}
          title="Wikipedia"
          navigationProps={{ setWikipediaArticles, wikipediaArticles }}
        />
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
