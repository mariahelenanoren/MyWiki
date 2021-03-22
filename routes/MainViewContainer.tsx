import React from "react";
import { Text, View } from "react-native";
import { Route, Switch } from "react-router-native";
import CreateViewContainer from "./CreateViewContainer";
import DefaultMainView from "./DefaultMainView";
import { globalStyles } from "../styling";

export default function MainViewContainer() {
  return (
    <View style={globalStyles.flex}>
      <Switch>
        <Route exact path="/" component={DefaultMainView} />
        <Route path="/new-project" component={CreateViewContainer} />
        <Text style={globalStyles.text}>Page cannot be fount</Text>
      </Switch>
    </View>
  );
}
