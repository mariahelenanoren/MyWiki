import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
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

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getImages("sunset");
      setData(response);
    };
    dataResponse();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.imageContainer}>
      {data.map((image) => (
        <Image
          key={image.urls.small}
          style={{ ...styles.image, width: windowWidth / 2 }}
          source={{ uri: image.urls.small }}
        ></Image>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    resizeMode: "cover",
  },
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
});
