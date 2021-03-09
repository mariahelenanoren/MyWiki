import React from "react";
import Navbar from "./Navbar";
import MainContainer from "./MainContainer";
import { View } from "react-native";

export default function Layout() {
  return (
    <View>
      <Navbar />
      <MainContainer />
    </View>
  );
}
