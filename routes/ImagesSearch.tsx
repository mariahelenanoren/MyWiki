import React, { useState, useEffect, useRef, useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Input from "../components/Input";
import ImageContainer from "../components/ImageContainer";
import { getImages } from "../helper";
import { colorPalette, globalStyles } from "../styling";
import { RouteComponentProps, withRouter } from "react-router";
import { ProjectContext } from "../contexts/ProjectContext";
import MainButton from "../components/MainButton";

interface Navigation {
  title: string;
}
interface ImageSizes {
  small: string;
}
interface ImageUrl {
  urls: ImageSizes[];
}

interface Props extends RouteComponentProps<{}, {}, Navigation> {}

function ImagesView(props: Props) {
  const { project, addImage, removeImage } = useContext(ProjectContext);
  const [data, setData] = useState<ImageUrl[]>([]);
  const [query, setQuery] = useState("");
  const [pageCounter, setPageCounter] = useState(1);
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getImages(query, pageCounter);
      setData(response);
    };
    dataResponse();
  }, [pageCounter, query]);

  const loadImages = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setPageCounter(pageCounter + 1);
  };

  const handlePress = (selected: boolean, url: string) => {
    selected ? addImage(url, query) : removeImage(url, query);
  };

  const checkIfSelected = (imageUrl: string) => {
    let selected;
    project.imageSections.forEach((section) => {
      selected = section.urls.find((url) => url === imageUrl);
    });
    return selected;
  };

  return (
    <View style={globalStyles.flex}>
      <Input placeholder="Search" onChange={(value) => setQuery(value)} />
      {query ? (
        <>
          <Text style={{ ...styles.query, ...globalStyles.semiBold }}>
            Search results for: "{query}"
          </Text>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.imageContainer}
          >
            {data.map((image) => (
              <ImageContainer
                onPress={(selected) => handlePress(selected, image.urls.small)}
                isSelected={checkIfSelected(image.urls.small)}
                key={image.urls.small}
                url={image.urls.small}
                searchTerm={query}
              />
            ))}
          </ScrollView>
          <MainButton
            style={styles.button}
            title="Load more images"
            onPress={() => loadImages()}
          />
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

export default withRouter(ImagesView);
