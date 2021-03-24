import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useRouteMatch } from "react-router-native";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import { getWikipediaSections } from "../helper";
import { colorPalette, globalStyles } from "../styling";

interface Section {
  line: string;
  number: string;
  anchor: string;
}

export default function WikipediaView() {
  const { url } = useRouteMatch();
  const [data, setData] = useState<Section[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getWikipediaSections(searchTerm);
      setData(response);
    };
    dataResponse();
    if (data.length > 1) {
      data.map((item) => {
        console.log(item.number);
      });
    }
  }, [searchTerm]);

  function handleChange(value: string) {
    setSearchTerm("Albert Einstein");
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
              ? data.map((object: Section) => (
                  <NavigationBar
                    path={url + "/" + object.anchor.toLowerCase()}
                    key={object.line}
                    title={object.line}
                    icon={"check-box"}
                    level={formatLevel(object.number)}
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
