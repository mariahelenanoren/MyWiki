import React, { Component, createContext } from "react";
interface ContextState extends ProjectState {
  setProjectInformation: (key: string, value: string) => void;
  addImage: (imageUrl: string) => void;
  addWikipediaSection: (
    title: string,
    wikipediaSection: WikipediaSection
  ) => void;
  addNewsArticle: (newsArticle: NewsArticle) => void;
  removeImage: (imageUrl: string) => void;
  removeWikipediaSection: (
    title: string,
    wikipediaSection: WikipediaSection
  ) => void;
  removeNewsArticle: (newsArticle: NewsArticle) => void;
}
interface ProjectState {
  project: ProjectItem;
}
export interface ProjectItem {
  title: string;
  description?: string;
  images: string[];
  wikipediaArticles: WikipediaArticle[];
  newsArticles: NewsArticle[];
}
export interface WikipediaArticle {
  title: string;
  sections: WikipediaSection[];
}
export interface WikipediaSection {
  title: string;
  level: string;
  number: string;
}
interface NewsArticle {
  title: string;
  linkUrl: string;
  imageUrl: string;
  introduction: string;
  body: string;
  author: string;
  date: string;
}

export const ProjectContext = createContext<ContextState>({
  project: { title: "", images: [], wikipediaArticles: [], newsArticles: [] },
  setProjectInformation: () => {},
  addImage: () => {},
  addWikipediaSection: () => {},
  addNewsArticle: () => {},
  removeImage: () => {},
  removeWikipediaSection: () => {},
  removeNewsArticle: () => {},
});

export default class ProjectProvider extends Component<{}, ProjectState> {
  state: ProjectState = {
    project: {
      title: "",
      images: [],
      wikipediaArticles: [],
      newsArticles: [],
    },
  };

  setProjectInformation = (key: string, value: string) => {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        [key]: value,
      },
    });
  };

  addImage = (imageUrl: string) => {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        images: [...this.state.project.images, imageUrl],
      },
    });
  };

  addWikipediaSection = (title: string, section: WikipediaSection) => {
    const changedArticle = this.state.project.wikipediaArticles.find(
      (article) => article.title === title
    );
    if (changedArticle) {
      this.state.project.wikipediaArticles.map((article: WikipediaArticle) => {
        if (article === changedArticle) {
          this.setState({
            ...this.state,
            project: {
              ...this.state.project,
              wikipediaArticles: [
                {
                  ...article,
                  sections: [...article.sections, section],
                },
              ],
            },
          });
        }
      });
    } else {
      this.setState({
        ...this.state,
        project: {
          ...this.state.project,
          wikipediaArticles: [
            ...this.state.project.wikipediaArticles,
            {
              title: title,
              sections: [section],
            },
          ],
        },
      });
    }
  };

  addNewsArticle = (newsArticle: NewsArticle) => {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        newsArticles: [...this.state.project.newsArticles, newsArticle],
      },
    });
  };

  removeImage = (imageUrl: string) => {
    const filteredImages = this.state.project.images.filter(
      (image) => image !== imageUrl
    );
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        images: [...filteredImages],
      },
    });
  };

  removeWikipediaSection = (
    title: string,
    wikipediaSection: WikipediaSection
  ) => {
    const changedArticle = this.state.project.wikipediaArticles.find(
      (article) => article.title === title
    );

    if (changedArticle) {
      if (changedArticle.sections.length === 1) {
        this.setState({
          ...this.state,
          project: {
            ...this.state.project,
            wikipediaArticles: [
              ...this.state.project.wikipediaArticles.filter(
                (article) => article.title !== title
              ),
            ],
          },
        });
      } else {
        this.state.project.wikipediaArticles.map((article) => {
          this.setState({
            ...this.state,
            project: {
              ...this.state.project,
              wikipediaArticles: [
                {
                  ...changedArticle,
                  sections: [
                    ...changedArticle.sections.filter(
                      (section) => section.title !== wikipediaSection.title
                    ),
                  ],
                },
              ],
            },
          });
        });
      }
    }
  };

  removeNewsArticle = (newsArticle: NewsArticle) => {
    const filteredArticles = this.state.project.newsArticles.filter(
      (article) => article !== newsArticle
    );
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        newsArticles: [...filteredArticles],
      },
    });
  };

  render() {
    return (
      <ProjectContext.Provider
        value={{
          project: this.state.project,
          setProjectInformation: this.setProjectInformation,
          addImage: this.addImage,
          addWikipediaSection: this.addWikipediaSection,
          addNewsArticle: this.addNewsArticle,
          removeImage: this.removeImage,
          removeWikipediaSection: this.removeWikipediaSection,
          removeNewsArticle: this.removeNewsArticle,
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
