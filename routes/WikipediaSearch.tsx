import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useRouteMatch, withRouter } from "react-router-native";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import { NavigationContext } from "../contexts/NavigationContext";
import { getWikipediaQuery } from "../helper";
import { ProjectContext, WikipediaArticle } from "../contexts/ProjectContext";
import { colorPalette, globalStyles } from "../styling";
import SelectionBar from "../components/SelectionBar";

interface Data {
  title: string;
  sections: Section[];
}

interface Section {
  anchor: string;
  fromtitle: string;
  line: string;
  number: string;
  index: string;
}

function WikipediaView() {
  const { addWikipediaSection, removeWikipediaSection, project } = useContext(
    ProjectContext
  );
  const { url } = useRouteMatch();
  const [data, setData] = useState<Data>();
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getWikipediaQuery(navigation.wikipediaQuery);
      setData(response);
    };
    dataResponse();
  }, [navigation.wikipediaQuery]);

  function handleChange(value: string) {
    navigation.setWikipediaQuery(value);
  }

  function formatLevel(number: string) {
    const level = number.split(".").length - 1;
    return String(level);
  }

  const handleSectionToggle = (iconToggle: boolean, section: Section) => {
    iconToggle
      ? addWikipediaSection(navigation.wikipediaQuery, {
          level: formatLevel(section.number),
          number: section.index,
          title: section.line,
        })
      : removeWikipediaSection(navigation.wikipediaQuery, {
          level: formatLevel(section.number),
          number: section.index,
          title: section.line,
        });
  };

  useEffect(() => {
    console.log(project);
  }, [project, addWikipediaSection]);

  const checkIfSelected = (wikipediaSection: Section) => {
    let selected;
    project.wikipediaArticles.forEach((article) => {
      selected = article.sections.find(
        (section) => section.title === wikipediaSection.line
      );
    });
    return Boolean(selected);
  };

  return (
    <View style={globalStyles.flex}>
      <Input onChange={(value) => handleChange(value)} placeholder="Search" />
      {navigation.wikipediaQuery ? (
        <>
          <Text style={{ ...styles.query, ...globalStyles.semiBold }}>
            Search results for: "{navigation.wikipediaQuery}"
          </Text>
          <ScrollView>
            {data
              ? data.sections.map((section: Section) => (
                  <SelectionBar
                    path={
                      url +
                      "/" +
                      data?.title +
                      "/" +
                      section.anchor.toLowerCase()
                    }
                    key={section.line}
                    iconPress={(iconToggle) =>
                      handleSectionToggle(iconToggle, section)
                    }
                    isSelected={checkIfSelected(section)}
                    title={section.line}
                    icon={"check-box"}
                    level={formatLevel(section.number)}
                    navigationProps={{
                      section: section.index,
                      type: "search",
                    }}
                  />
                ))
              : null}
          </ScrollView>
        </>
      ) : (
        <View style={{ ...styles.defaultContainer, ...globalStyles.flex }}>
          <Text style={{ ...globalStyles.text, ...styles.defaultText }}>
            Please enter a search term to view Wikipedia articles
          </Text>
        </View>
      )}
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
