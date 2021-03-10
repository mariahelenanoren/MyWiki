import React from "react";
import Navbar from "./Navbar";
import { NativeRouter } from "react-router-native";

import MainContainer from "./MainContainer";
import { View } from "react-native";

export default function Layout() {
  return (
    <NativeRouter>
      <View style={{ flex: 1 }}>
        <Navbar />
        <MainContainer />
      </View>
    </NativeRouter>
  );
}
