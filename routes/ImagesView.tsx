import React, { useState, useEffect, createRef, useRef } from "react";
import {
  Image,
  useWindowDimensions,
  ScrollView,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Text,
} from "react-native";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import { getImages } from "../helper";
import { globalStyles } from "../styling";

interface ImageSizes {
  small: string;
}
interface ImageUrl {
  urls: ImageSizes[];
}

export default function ImageView() {
  const windowWidth = useWindowDimensions().width;
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

  const handlePress = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setPageCounter(pageCounter + 1);
  };

  return (
    <View style={globalStyles.flex}>
      <Input placeholder="Search" onChange={(value) => setSearchTerm(value)} />
      {searchTerm ? <Text>Search results for: "{searchTerm}"</Text> : null}
      {data.length ? (
        <>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.imageContainer}
          >
            {data.map((image) => (
              <Image
                key={image.urls.small}
                style={{ ...styles.image, width: windowWidth / 2 - 40 }}
                source={{ uri: image.urls.small }}
              ></Image>
            ))}
            <MainButton
              style={styles.button}
              title="Load more images"
              onPress={() => handlePress()}
            />
          </ScrollView>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
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
});
