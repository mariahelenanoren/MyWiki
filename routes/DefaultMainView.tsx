import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import ProjectCard from "../components/ProjectCard";
import { ProjectListContext } from "../contexts/ProjectListContext";
import { colorPalette, globalStyles } from "../styling";

export default function DefaultMainView() {
  const { projects } = useContext(ProjectListContext);

  return (
    <View>
      {projects.length ? (
        projects.map((project, index) => (
          <ProjectCard key={index} title={project.title} />
        ))
      ) : (
        <View style={styles.defaultView}>
          <Text
            style={{
              ...globalStyles.text,
              marginBottom: 5,
              color: colorPalette.secondaryColor,
            }}
          >
            You dont have any projects
          </Text>
          <Link
            to={{
              pathname: "/new-project",
              state: { title: "New project", navbarType: "defaultNavbar" },
            }}
          >
            <Text style={{ ...globalStyles.link, ...globalStyles.text }}>
              Click here to create one
            </Text>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultView: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
