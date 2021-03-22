import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import { getWikipediaSections } from "../helper";
import { globalStyles } from "../styling";

interface Section {
  line: string;
  number: string;
}

export default function WikipediaView() {
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
        <Text style={{ ...styles.query, ...globalStyles.semiBold }}>
          Search results for: "{searchTerm}"
        </Text>
      ) : null}
      <ScrollView>
        {data.length
          ? data.map((object: Section) => (
              <NavigationBar
                key={object.line}
                title={object.line}
                level={formatLevel(object.number)}
              />
            ))
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  query: {
    marginBottom: 10,
    marginTop: 25,
  },
});
