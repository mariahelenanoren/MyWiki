import React from "react";
import { Text, View } from "react-native";
import { Route, Switch } from "react-router-native";
import NewProjectMaster from "../routes/NewProjectMaster";
import DefaultMain from "../routes/DefaultMain";
import { globalStyles } from "../styling";

export default function MainContainer() {
  return (
    <View style={globalStyles.flex}>
      <Switch>
        <Route exact path="/" component={DefaultMain} />
        <Route path="/new-project" component={NewProjectMaster} />
        <Text style={globalStyles.text}>Page cannot be fount</Text>
      </Switch>
    </View>
  );
}
