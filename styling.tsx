import { StyleSheet } from "react-native";

export const colorPalette = {
  primaryColor: "#00B2FF",
  secondaryColor: "#F6F6F6",
  borderColor: "#CBCBCB",
  defaultColor: "#ffffff",
  secondaryTextColor: "#828282",
};

export const globalStyles = StyleSheet.create({
  text: {
    fontSize: 17,
  },
  link: {
    color: colorPalette.primaryColor,
    textDecorationLine: "underline",
    textDecorationColor: colorPalette.primaryColor,
    textDecorationStyle: "solid",
  },
  semiBold: {
    fontWeight: "500",
  },
});
