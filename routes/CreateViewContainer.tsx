import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link, Route, Switch, useRouteMatch } from "react-router-native";
import ImagesApi from "./ImagesView";
import WikipediaApi from "./WikipediaView";
import ProjectInput from "./CreateView";
import NewsApi from "./NewsView";
import { globalStyles } from "../styling";

export default function CreateViewContainer() {
  let { url } = useRouteMatch();

  return (
    <View style={globalStyles.flex}>
      <Switch>
        <Route path={url + "/images"} component={ImagesApi} />
        <Route path={url + "/wikipedia"} component={WikipediaApi} />
        <Route path={url + "/articles"} component={NewsApi} />
        <Route exact path={url} component={ProjectInput} />
      </Switch>
    </View>
  );
}
