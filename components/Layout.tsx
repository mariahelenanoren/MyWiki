import React from "react";
import Navbar from "./Navbar";
import { NativeRouter } from "react-router-native";

import MainContainer from "./MainContainer";
import { View } from "react-native";
import { globalStyles } from "../styling";

export default function Layout() {
  return (
    <NativeRouter>
      <View style={globalStyles.flex}>
        <Navbar />
        <MainContainer />
      </View>
    </NativeRouter>
  );
}
