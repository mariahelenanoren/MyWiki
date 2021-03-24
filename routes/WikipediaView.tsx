import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useRouteMatch } from "react-router-native";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import { getWikipediaQuery } from "../helper";
import { colorPalette, globalStyles } from "../styling";

interface Section {
  line: string;
  number: string;
  anchor: string;
  level: string;
}

export default function WikipediaView() {
  const { url } = useRouteMatch();
  const [data, setData] = useState<Section[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getWikipediaQuery(searchTerm);
      setData(response);
    };
    dataResponse();
  }, [searchTerm]);

  function handleChange(value: string) {
    setSearchTerm(value);
  }

  function formatLevel(number: string) {
    const level = number.split(".").length - 1;
    return level;
  }

  return (
    <View style={globalStyles.flex}>
      <Input onChange={(value) => handleChange(value)} placeholder="Search" />
      {searchTerm ? (
        <>
          <Text style={{ ...styles.query, ...globalStyles.semiBold }}>
            Search results for: "{searchTerm}"
          </Text>
          <ScrollView>
            {data.length
              ? data.map((section: Section) => (
                  <NavigationBar
                    path={url + "/" + section.anchor.toLowerCase()}
                    key={section.line}
                    title={section.line}
                    icon={"check-box"}
                    level={formatLevel(section.number)}
                    navigationData={{
                      section: section.level,
                      searchTerm: searchTerm,
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
