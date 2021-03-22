import React, { useState, useEffect, createRef } from "react";
import {
  Image,
  useWindowDimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import MainButton from "../components/MainButton";
import { getImages } from "../helper";

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
  const scrollRef = createRef<ScrollView>();

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getImages("sunset", pageCounter);
      setData(response);
    };
    dataResponse();
  }, [pageCounter]);

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.imageContainer}>
      {data.map((image) => (
        <Image
          key={image.urls.small}
          style={{ ...styles.image, width: windowWidth / 2 - 40 }}
          source={{ uri: image.urls.small }}
        ></Image>
      ))}
      <MainButton
        title="Load more images"
        handlePress={() => (
          setPageCounter(pageCounter + 1),
          scrollRef.current?.scrollTo({ y: 0, animated: false })
        )}
      />
    </ScrollView>
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
});
