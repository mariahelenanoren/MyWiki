import React from "react";
import { useHistory } from "react-router-native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  title: string;
  styles: any;
  colorPalette: any;
}

function DefaultNavbar(props: Props) {
  const history = useHistory();
  return (
    <View style={props.styles.navbar}>
      <Icon
        style={{ ...props.styles.icon, ...props.styles.iconLink, left: 35 }}
        name="arrow-back"
        onPress={() => history.goBack()}
      />
      <Text style={props.styles.navTitle}>{props.title}</Text>
    </View>
  );
}

export default DefaultNavbar;
