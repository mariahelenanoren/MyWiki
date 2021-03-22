import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  useWindowDimensions,
  Image,
} from "react-native";
import { colorPalette } from "../styling";

interface Props {
  urls: ImageSizes[];
}

interface ImageSizes {
  small: string;
}

export default function ImageContainer(props: Props) {
  const windowWidth = useWindowDimensions().width;
  const [borderStyle, setBorderStyle] = useState({
    borderColor: colorPalette.borderColor,
  });
  const [selected, setSelected] = useState(false);

  function handlePress() {
    setSelected(!selected);
    console.log(selected);
  }
  useEffect(() => {
    selected
      ? setBorderStyle({ borderColor: colorPalette.primaryColor })
      : setBorderStyle({ borderColor: colorPalette.borderColor });
  }, [selected]);

  return (
    <TouchableHighlight onPress={() => handlePress()}>
      <Image
        key={props.urls.small}
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
    borderStyle: "solid",
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
