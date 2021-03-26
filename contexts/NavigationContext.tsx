import React, { Component, createContext } from "react";

interface ContextState extends NavigationState {
  setImagesQuery: (query: string) => void;
  setWikipediaQuery: (query: string) => void;
  setNewsQuery: (query: string) => void;
}

interface NavigationState {
  imagesQuery: string;
  wikipediaQuery: string;
  newsQuery: string;
}

export const NavigationContext = createContext<ContextState>({
  imagesQuery: "",
  wikipediaQuery: "",
  newsQuery: "",
  setImagesQuery: () => {},
  setWikipediaQuery: () => {},
  setNewsQuery: () => {},
});

export default class ContextProvider extends Component<{}, NavigationState> {
  state: NavigationState = {
    imagesQuery: "",
    wikipediaQuery: "",
    newsQuery: "",
  };

  setImagesQuery = (query: string) => {
    this.setState({
      ...this.state,
      imagesQuery: query,
    });
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
          imagesQuery: this.state.imagesQuery,
          wikipediaQuery: this.state.wikipediaQuery,
          newsQuery: this.state.newsQuery,
          setImagesQuery: this.setImagesQuery,
          setWikipediaQuery: this.setWikipediaQuery,
          setNewsQuery: this.setNewsQuery,
        }}
      >
        {this.props.children}
      </NavigationContext.Provider>
    );
  }
}
