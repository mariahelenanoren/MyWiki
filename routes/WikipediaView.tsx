import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import {
  RouteComponentProps,
  useRouteMatch,
  withRouter,
} from "react-router-native";
import { ProjectContext, WikipediaSection } from "../contexts/ProjectContext";
import { colorPalette, globalStyles } from "../styling";
import SelectionBar from "../components/SelectionBar";

interface Navigation {
  title: string;
}

interface Props extends RouteComponentProps<{}, {}, Navigation> {
  type: "edit" | "view";
}

function WikipediaView(props: Props) {
  const { addWikipediaSection, removeWikipediaSection, project } = useContext(
    ProjectContext
  );
  const { url } = useRouteMatch();

  const handleSectionToggle = (
    iconToggle: boolean,
    section: WikipediaSection
  ) => {
    iconToggle
      ? addWikipediaSection(props.location.state.title, section)
      : removeWikipediaSection(props.location.state.title, section);
  };

  return (
    <View style={globalStyles.flex}>
      <ScrollView>
        {project.wikipediaArticles.map((article) =>
          article.title === props.location.state.title
            ? article.sections.map((section) => (
                <SelectionBar
                  title={section.title}
                  key={section.number}
                  icon={"check-box"}
                  isSelected={true}
                  iconPress={(iconToggle) =>
                    handleSectionToggle(iconToggle, section)
                  }
                  level={section.number}
                  path={url + "/" + section.title}
                  navigationProps={{
                    section: section.number,
                  }}
                />
              ))
            : null
        )}
      </ScrollView>
    </View>
  );
}

export default withRouter(WikipediaView);

const styles = StyleSheet.create({
  query: {
    marginBottom: 10,
    marginTop: 25,
  },
  defaultContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultText: {
    color: colorPalette.secondaryColor,
    textAlign: "center",
    maxWidth: 220,
  },
});
