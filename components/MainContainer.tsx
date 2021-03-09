import React from "react";
import { Text } from "react-native";
import { Route, Switch } from "react-router-native";
import NewProject from "./NewProject";
import DefaultMain from "./DefaultMain";

export default function MainContainer() {
  return (
    <Switch>
      <Route exact path="/" component={DefaultMain} />
      <Route path="/:title?" component={NewProject} />
      <Text>Page cannot be fount</Text>
    </Switch>
  );
}
