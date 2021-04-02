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
  searchTerm: string;
  onPress: (selected: boolean) => void;
  isSelected?: boolean;
}

export default function ImageContainer(props: Props) {
  const windowWidth = useWindowDimensions().width;
  const { project } = useContext(ProjectContext);
  const [borderStyle, setBorderStyle] = useState({
    borderColor: colorPalette.borderColor,
  });
  const [selected, setSelected] = useState(props.isSelected || false);

  const handlePress = () => {
    setSelected(!selected);
    props.onPress(!selected);
  };

  useEffect(() => {
    selected
      ? setBorderStyle({ borderColor: colorPalette.primaryColor })
      : setBorderStyle({ borderColor: colorPalette.borderColor });
  }, [selected]);

  return (
    <TouchableHighlight onPress={() => handlePress()}>
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
