import React, { useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ImageContainer from "../components/ImageContainer";
import { colorPalette, globalStyles } from "../styling";
import { RouteComponentProps, withRouter } from "react-router";
import { ProjectContext } from "../contexts/ProjectContext";

interface Navigation {
  title: string;
}

interface Props extends RouteComponentProps<{}, {}, Navigation> {
  type: "edit" | "view";
}

function ImagesView(props: Props) {
  const { project, addImage, removeImage } = useContext(ProjectContext);

  const handlePress = (selected: boolean, url: string) => {
    selected
      ? addImage(url, props.location.state.title)
      : removeImage(url, props.location.state.title);
  };

  return (
    <View style={globalStyles.flex}>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {project.imageSections.map((section) =>
          section.title === props.location.state.title
            ? section.urls.map((url) => (
                <ImageContainer
                  isSelected={true}
                  onPress={(selected) => handlePress(selected, url)}
                  url={url}
                  key={url}
                  searchTerm={props.location.state.title}
                />
              ))
            : null
        )}
      </ScrollView>
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

export default withRouter(ImagesView);
