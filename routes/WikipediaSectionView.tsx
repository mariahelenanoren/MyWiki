import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { getWikipediaSection } from "../helper";

interface Props extends RouteComponentProps<{}, {}, Navigation> {}
interface Navigation {
  navigationData: {
    section: string;
    searchTerm: string;
  };
}

function WikipediaSection(props: Props) {
  const [data, setData] = useState();

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getWikipediaSection(
        props.location.state.navigationData.searchTerm,
        props.location.state.navigationData.section
      );
      setData(response);
    };
    dataResponse();
  }, []);
  console.log(data);
  return <ScrollView>{data ? <Text>{data}</Text> : null}</ScrollView>;
}

export default withRouter(WikipediaSection);
