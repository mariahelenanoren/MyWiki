import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-native";
import ImagesApi from "./ImagesApi";
import WikipediaApi from "./WikipediaApi";
import ProjectInput from "./NewProjectInput";
import NewsApi from "./NewsApi";

export default function MainContainer() {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={url + "/images"} component={ImagesApi} />
      <Route path={url + "/wikipedia"} component={WikipediaApi} />
      <Route path={url + "/articles"} component={NewsApi} />
      <Route path={url} component={ProjectInput} />
    </Switch>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 35,
    paddingHorizontal: 35,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
