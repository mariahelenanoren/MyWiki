import React from "react";
import { Text, View } from "react-native";
import { Route, Switch } from "react-router-native";
import NewProject from "../routes/NewProject";
import DefaultMain from "../routes/DefaultMain";

export default function MainContainer() {
  return (
    <View style={{ flex: 1 }}>
      <Switch>
        <Route exact path="/" component={DefaultMain} />
        <Route path="/new-project" component={NewProject} />
        <Text>Page cannot be fount</Text>
      </Switch>
    </View>
  );
}
