import React from "react";
import Navbar from "../components/Navbar";
import { NativeRouter } from "react-router-native";
import MainViewRoute from "./MainViewRoute";
import { View } from "react-native";
import { globalStyles } from "../styling";

export default function Layout() {
  return (
    <NativeRouter>
      <View style={globalStyles.flex}>
        <Navbar />
        <MainViewRoute />
      </View>
    </NativeRouter>
  );
}
