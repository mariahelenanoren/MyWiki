import React from "react";
import { Text } from "react-native";
import Input from "../components/Input";

export default function WikipediaView() {
  function handleChange(value: string) {}

  return (
    <Input onChange={(value) => handleChange(value)} placeholder="Search" />
  );
}
