import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useRouteMatch, withRouter } from "react-router-native";
import Input from "../components/Input";
import { getWikipediaQuery } from "../helper";
import { ProjectContext } from "../contexts/ProjectContext";
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
  const [data, setData] = useState<Data>();
  const [query, setQuery] = useState("");
  const { addWikipediaSection, removeWikipediaSection, project } = useContext(
    ProjectContext
  );
  const { url } = useRouteMatch();

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getWikipediaQuery(query);
      setData(response);
    };
    dataResponse();
  }, [query]);

  function formatLevel(number: string) {
    const level = number.split(".").length - 1;
    return String(level);
  }

  const handleSectionToggle = (iconToggle: boolean, section: Section) => {
    iconToggle
      ? addWikipediaSection(query, {
          level: formatLevel(section.number),
          number: section.index,
          title: section.line,
        })
      : removeWikipediaSection(query, {
          level: formatLevel(section.number),
          number: section.index,
          title: section.line,
        });
  };

  const checkIfSelected = (articleTitle: string, wikipediaSection: Section) => {
    let selected;
    project.wikipediaArticles.forEach((article) => {
      if (article.title === articleTitle) {
        console.log(article.title);
        selected = article.sections.find(
          (section) => section.title === wikipediaSection.line
        );
      }
    });
    return Boolean(selected);
  };

  return (
    <View style={globalStyles.flex}>
      <Input onChange={(value) => setQuery(value)} placeholder="Search" />
      {query ? (
        <>
          <Text style={{ ...styles.query, ...globalStyles.semiBold }}>
            Search results for: "{query}"
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
                    isSelected={checkIfSelected(data.title, section)}
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
