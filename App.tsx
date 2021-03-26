import React from "react";
import Layout from "./routes/Layout";
import { StyleSheet, SafeAreaView } from "react-native";
import ProjectProvider from "./contexts/ProjectContext";
import ProjectListProvider from "./contexts/ProjectListContext";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <ProjectProvider>
        <ProjectListProvider>
          <Layout />
        </ProjectListProvider>
      </ProjectProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
