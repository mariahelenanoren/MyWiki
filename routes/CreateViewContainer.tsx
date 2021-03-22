import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-native";
import ImagesApi from "./ImagesView";
import WikipediaApi from "./WikipediaView";
import ProjectInput from "./CreateView";
import NewsApi from "./NewsView";

export default function CreateViewContainer() {
  let { url } = useRouteMatch();

  return (
    <View style={styles.mainContainer}>
      <Switch>
        <Route path={url + "/images"} component={ImagesApi} />
        <Route path={url + "/wikipedia"} component={WikipediaApi} />
        <Route path={url + "/articles"} component={NewsApi} />
        <Route exact path={url} component={ProjectInput} />
      </Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 35,
    flex: 1,
    backgroundColor: "white",
  },
});
