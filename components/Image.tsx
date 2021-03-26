import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  useWindowDimensions,
  Image,
} from "react-native";
import { ProjectContext } from "../contexts/ProjectContext";
import { colorPalette } from "../styling";

interface Props {
  url: string;
}

export default function ImageContainer(props: Props) {
  const windowWidth = useWindowDimensions().width;
  const { addImage, removeImage, project } = useContext(ProjectContext);
  const [borderStyle, setBorderStyle] = useState({
    borderColor: colorPalette.borderColor,
  });
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    project.images.forEach((url) => {
      if (url === props.url) {
        setSelected(true);
      }
    });
  }, []);

  useEffect(() => {
    selected
      ? (setBorderStyle({ borderColor: colorPalette.primaryColor }),
        addImage(props.url))
      : (setBorderStyle({ borderColor: colorPalette.borderColor }),
        removeImage(props.url));
  }, [selected]);

  return (
    <TouchableHighlight onPress={() => setSelected(!selected)}>
      <Image
        style={{
          ...styles.image,
          width: windowWidth / 2 - 40,
          ...borderStyle,
        }}
        source={{ uri: props.url }}
      ></Image>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
    borderWidth: 3,
  },
  button: {
    marginTop: 10,
  },
  query: {
    marginTop: 25,
    marginBottom: 10,
  },
});
