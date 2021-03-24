import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { NavigationContext } from "../contexts/NavigationContext";
import { getWikipediaSection } from "../helper";

interface Props extends RouteComponentProps<{}, {}, Navigation> {}
interface Navigation {
  navigationProps: {
    section: string;
    searchTerm: string;
  };
}

function WikipediaSection(props: Props) {
  const navigation = useContext(NavigationContext);
  const [data, setData] = useState();

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getWikipediaSection(
        props.location.state.navigationProps.section,
        navigation.wikipediaQuery
      );
      setData(response);
    };
    dataResponse();
  }, []);
  return <ScrollView>{data ? <Text>{data}</Text> : null}</ScrollView>;
}

export default withRouter(WikipediaSection);
