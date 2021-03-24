import React, { Component, createContext } from "react";

interface ContextState extends NavigationState {
  setWikipediaQuery: (query: string) => void;
  setNewsQuery: (query: string) => void;
}

interface NavigationState {
  wikipediaQuery: string;
  newsQuery: string;
}

export const NavigationContext = createContext<ContextState>({
  wikipediaQuery: "",
  newsQuery: "",
  setWikipediaQuery: () => {},
  setNewsQuery: () => {},
});

export default class ContextProvider extends Component<{}, NavigationState> {
  state: NavigationState = {
    wikipediaQuery: "",
    newsQuery: "",
  };

  setWikipediaQuery = (query: string) => {
    this.setState({
      ...this.state,
      wikipediaQuery: query,
    });
  };

  setNewsQuery = (query: string) => {
    this.setState({
      ...this.state,
      newsQuery: query,
    });
  };

  render() {
    return (
      <NavigationContext.Provider
        value={{
          wikipediaQuery: this.state.wikipediaQuery,
          newsQuery: this.state.newsQuery,
          setWikipediaQuery: this.setWikipediaQuery,
          setNewsQuery: this.setNewsQuery,
        }}
      >
        {this.props.children}
      </NavigationContext.Provider>
    );
  }
}
