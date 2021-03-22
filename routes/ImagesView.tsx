import React, { useState, useEffect, createRef, useRef } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import ImageContainer from "../components/Image";
import { getImages } from "../helper";
import { colorPalette, globalStyles } from "../styling";

interface ImageSizes {
  small: string;
}
interface ImageUrl {
  urls: ImageSizes[];
}

export default function ImageView() {
  const [data, setData] = useState<ImageUrl[]>([]);
  const [pageCounter, setPageCounter] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getImages(searchTerm, pageCounter);
      setData(response);
      console.log(response.anchor);
    };
    dataResponse();
  }, [pageCounter, searchTerm]);

  function loadImages() {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setPageCounter(pageCounter + 1);
  }

  return (
    <View style={globalStyles.flex}>
      <Input placeholder="Search" onChange={(value) => setSearchTerm(value)} />
      {searchTerm ? (
        <>
          <Text style={{ ...styles.query, ...globalStyles.semiBold }}>
            Search results for: "{searchTerm}"
          </Text>
          {data.length ? (
            <>
              <ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.imageContainer}
              >
                {data.map((image) => (
                  <ImageContainer urls={image.urls} />
                ))}
                <MainButton
                  style={styles.button}
                  title="Load more images"
                  onPress={() => loadImages()}
                />
              </ScrollView>
            </>
          ) : null}
        </>
      ) : (
        <View style={{ ...styles.defaultContainer, ...globalStyles.flex }}>
          <Text style={{ ...globalStyles.text, ...styles.defaultText }}>
            Please enter a search term to view images
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  button: {
    marginTop: 10,
  },
  query: {
    marginTop: 25,
    marginBottom: 10,
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
