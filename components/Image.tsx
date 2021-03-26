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
  urls: ImageSizes[];
}

interface ImageSizes {
  small: string;
}

export default function ImageContainer(props: Props) {
  const windowWidth = useWindowDimensions().width;
  const projectContext = useContext(ProjectContext);
  const [borderStyle, setBorderStyle] = useState({
    borderColor: colorPalette.borderColor,
  });
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    selected
      ? (setBorderStyle({ borderColor: colorPalette.primaryColor }),
        projectContext.addImage(props.urls.small))
      : (setBorderStyle({ borderColor: colorPalette.borderColor }),
        projectContext.removeImage(props.urls.small));
  }, [selected]);

  return (
    <TouchableHighlight onPress={() => setSelected(!selected)}>
      <Image
        style={{
          ...styles.image,
          width: windowWidth / 2 - 40,
          ...borderStyle,
        }}
        source={{ uri: props.urls.small }}
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
