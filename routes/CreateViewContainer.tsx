import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link, Route, Switch, useRouteMatch } from "react-router-native";
import ImagesView from "./ImagesView";
import WikipediaView from "./WikipediaView";
import WikipediaSectionView from "./WikipediaSectionView";
import ProjectView from "./CreateView";
import NewsView from "./NewsView";
import { globalStyles } from "../styling";

export default function CreateViewContainer() {
  let { url } = useRouteMatch();

  return (
    <View style={globalStyles.flex}>
      <Switch>
        <Route exact path={url} component={ProjectView} />
        <Route path={url + "/images"} component={ImagesView} />
        <Route exact path={url + "/wikipedia"} component={WikipediaView} />
        <Route
          path={url + "/wikipedia/:section"}
          component={WikipediaSectionView}
        />
        <Route path={url + "/articles"} component={NewsView} />
      </Switch>
    </View>
  );
}
