import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Route, Switch } from "react-router-native";
import CreateViewRoute from "./CreateViewRoute";
import DefaultMainView from "./DefaultMainView";
import { globalStyles } from "../styling";

export default function MainViewContainer() {
  return (
    <View style={{ ...styles.mainContainer, ...globalStyles.flex }}>
      <Switch>
        <Route exact path="/" component={DefaultMainView} />
        <Route path="/new-project" component={CreateViewRoute} />
        <Text style={globalStyles.text}>Page cannot be fount</Text>
      </Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 25,
    paddingHorizontal: 35,
    flex: 1,
    backgroundColor: "white",
  },
});
