import React from "react";
import { View } from "react-native";
import { Route, Switch, useRouteMatch } from "react-router-native";
import ImagesSearch from "./ImagesSearch";
import WikipediaSearch from "./WikipediaSearch";
import WikipediaSectionView from "./WikipediaSectionView";
import ProjectView from "./CreateView";
import NewsSearch from "./NewsSearch";
import { globalStyles } from "../styling";
import WikipediaView from "./WikipediaView";
import ImagesView from "./ImagesView";

export default function CreateViewContainer() {
  const { url } = useRouteMatch();

  return (
    <View style={globalStyles.flex}>
      <Switch>
        <Route exact path={url} component={ProjectView} />
        <Route exact path={url + "/images"} component={ImagesSearch} />
        <Route path={url + "/images/:section"} component={ImagesView} />
        <Route exact path={url + "/wikipedia"} component={WikipediaSearch} />
        <Route
          exact
          path={url + "/wikipedia/:article"}
          component={WikipediaView}
        />
        <Route
          path={url + "/wikipedia/:article/:section"}
          component={WikipediaSectionView}
        />
        <Route path={url + "/articles"} component={NewsSearch} />
      </Switch>
    </View>
  );
}
