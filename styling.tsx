import { StyleSheet } from "react-native";

export const colorPalette = {
  primaryColor: "#00B2FF",
  secondaryColor: "#828282",
  secondaryBgColor: "#F6F6F6",
  primaryBgColor: "#ffffff",
  borderColor: "#CBCBCB",
};

export const globalStyles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  title: {
    fontWeight: "500",
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
  flex: {
    flex: 1,
  },
});
