import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import { getWikipediaHeadlines } from "../helper";

interface Section {
  line: string;
  number: string;
}

export default function WikipediaView() {
  const [data, setData] = useState<Section[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getWikipediaHeadlines(searchTerm);
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
    const level = number.split(".").length;
    return level;
  }

  return (
    <>
      <Input onChange={(value) => handleChange(value)} placeholder="Search" />
      <ScrollView>
        {data.length
          ? data.map((object: Section) => (
              <NavigationBar
                title={object.line}
                level={formatLevel(object.number)}
              />
            ))
          : null}
      </ScrollView>
    </>
  );
}
