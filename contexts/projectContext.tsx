import React, { Component, createContext } from "react";
interface ContextState extends ProjectState {
  setProjectInformation: (key: string, value: string) => void;
  addImage: (imageUrl: string, title: string) => void;
  addWikipediaSection: (
    title: string,
    wikipediaSection: WikipediaSection
  ) => void;
  addNewsArticle: (newsArticle: NewsArticle) => void;
  removeImage: (imageUrl: string, title: string) => void;
  removeImageSection: (titel: string) => void;
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
  imageSections: ImageSection[];
  wikipediaArticles: WikipediaArticle[];
  newsArticles: NewsArticle[];
}

interface ImageSection {
  title: string;
  urls: string[];
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
  project: {
    title: "",
    imageSections: [],
    wikipediaArticles: [],
    newsArticles: [],
  },
  setProjectInformation: () => {},
  addImage: () => {},
  addWikipediaSection: () => {},
  addNewsArticle: () => {},
  removeImage: () => {},
  removeImageSection: () => {},
  removeWikipediaSection: () => {},
  removeNewsArticle: () => {},
});

export default class ProjectProvider extends Component<{}, ProjectState> {
  state: ProjectState = {
    project: {
      title: "",
      imageSections: [],
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

  addImage = (imageUrl: string, title: string) => {
    const changedSection = this.state.project.imageSections.find(
      (section) => section.title === title
    );

    if (changedSection) {
      this.state.project.imageSections.map((section) => {
        if (section.title === changedSection.title) {
          this.setState({
            project: {
              ...this.state.project,
              imageSections: [
                ...this.state.project.imageSections.filter(
                  (section) => section.title !== changedSection.title
                ),
                { ...changedSection, urls: [...changedSection.urls, imageUrl] },
              ],
            },
          });
        }
      });
    } else {
      this.setState({
        project: {
          ...this.state.project,
          imageSections: [
            ...this.state.project.imageSections,
            { title: title, urls: [imageUrl] },
          ],
        },
      });
    }
  };

  addWikipediaSection = (
    articleTitle: string,
    wikipediaSection: WikipediaSection
  ) => {
    const changedArticle = this.state.project.wikipediaArticles.find(
      (article) => article.title === articleTitle
    );

    if (changedArticle) {
      this.state.project.wikipediaArticles.forEach((article) => {
        if (article.title === changedArticle.title) {
          this.setState({
            project: {
              ...this.state.project,
              wikipediaArticles: [
                ...this.state.project.wikipediaArticles.filter(
                  (article) => article.title !== articleTitle
                ),
                {
                  ...changedArticle,
                  sections: [...changedArticle.sections, wikipediaSection],
                },
              ],
            },
          });
        }
      });
    } else {
      this.setState({
        project: {
          ...this.state.project,
          wikipediaArticles: [
            ...this.state.project.wikipediaArticles,
            { title: articleTitle, sections: [{ ...wikipediaSection }] },
          ],
        },
      });
    }
  };

  addNewsArticle = (newsArticle: NewsArticle) => {
    this.setState({
      project: {
        ...this.state.project,
        newsArticles: [...this.state.project.newsArticles, newsArticle],
      },
    });
  };

  removeImage = (imageUrl: string, title: string) => {
    const changedSection = this.state.project.imageSections.find(
      (section) => section.title === title
    );

    if (changedSection) {
      if (changedSection.urls.length === 1) {
        const filteredSections = this.state.project.imageSections.filter(
          (section) => section.title !== changedSection.title
        );
        this.setState({
          project: {
            ...this.state.project,
            imageSections: [...filteredSections],
          },
        });
      } else {
        this.state.project.imageSections.map((section) => {
          this.setState({
            project: {
              ...this.state.project,
              imageSections: [
                {
                  ...changedSection,
                  urls: [
                    ...changedSection.urls.filter((url) => url !== imageUrl),
                  ],
                },
              ],
            },
          });
        });
      }
    }
  };

  removeImageSection = (title: string) => {
    const filteredSections = this.state.project.imageSections.filter(
      (section) => section.title !== title
    );
    this.setState({
      project: {
        ...this.state.project,
        imageSections: [...filteredSections],
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
        /* Removes article which the section belongs to */
        this.setState({
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
        /* Removes section from article */
        this.state.project.wikipediaArticles.map((article) => {
          this.setState({
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
          removeImageSection: this.removeImageSection,
          removeWikipediaSection: this.removeWikipediaSection,
          removeNewsArticle: this.removeNewsArticle,
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
