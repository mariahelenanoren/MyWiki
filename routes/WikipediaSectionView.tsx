import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { getWikipediaSection } from "../helper";

interface Props extends RouteComponentProps<{}, {}, Navigation> {}
interface Navigation {
  title: string;
  navigationProps: {
    section: string;
  };
}

function WikipediaSection(props: Props) {
  const [data, setData] = useState();

  useEffect(() => {
    const dataResponse = async () => {
      const response = await getWikipediaSection(
        props.location.state.navigationProps.section,
        props.location.state.title
      );
      setData(response);
    };
    dataResponse();
  }, []);
  return <ScrollView>{data ? <Text>{data}</Text> : null}</ScrollView>;
}

export default withRouter(WikipediaSection);
