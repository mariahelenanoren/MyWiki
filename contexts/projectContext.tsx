import { Component, createContext } from "react";
interface ContextState extends ProjectState {
  addImage: (imageUrl: string) => void;
  addWikipediaArticle: (wikipediaArticle: WikipediaArticle) => void;
  addWikipediaSection: (
    wikipediaArticle: WikipediaArticle,
    wikipediaSection: WikipediaSection
  ) => void;
  addNewsArticle: (newsArticle: NewsArticle) => void;
  removeImage: (imageUrl: string) => void;
  removeWikipediaArticle: (wikipediaArticle: WikipediaArticle) => void;
  removeWikipediaSection: (
    wikipediaArticle: WikipediaArticle,
    wikipediaSection: WikipediaSection
  ) => void;
  removeNewsArticle: (newsArticle: NewsArticle) => void;
}
interface ProjectState {
  projects: ProjectItem[];
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
  projects: [],
  project: { title: "", images: [], wikipediaArticles: [], newsArticles: [] },
  addImage: () => {},
  addWikipediaArticle: () => {},
  addWikipediaSection: () => {},
  addNewsArticle: () => {},
  removeImage: () => {},
  removeWikipediaArticle: () => {},
  removeWikipediaSection: () => {},
  removeNewsArticle: () => {},
});

export default class ProjectProvider extends Component<{}, ProjectState> {
  state: ProjectState = {
    projects: [],
    project: {
      title: "",
      images: [],
      wikipediaArticles: [],
      newsArticles: [],
    },
  };

  addImage(imageUrl: string) {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        images: [...this.state.project.images, imageUrl],
      },
    });
  }

  addWikipediaArticle(wikipediaArticle: WikipediaArticle) {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        wikipediaArticles: [
          ...this.state.project.wikipediaArticles,
          wikipediaArticle,
        ],
      },
    });
  }

  addWikipediaSection(
    wikipediaArticle: WikipediaArticle,
    section: WikipediaSection
  ) {
    const changedArticle = this.state.project.wikipediaArticles.find(
      (article) => article === wikipediaArticle
    );
    this.state.project.wikipediaArticles.map((article: WikipediaArticle) => {
      if (article === changedArticle) {
        this.setState({
          ...this.state,
          project: {
            ...this.state.project,
            wikipediaArticles: [
              ...this.state.project.wikipediaArticles,
              {
                ...article,
                sections: [...article.sections, section],
              },
            ],
          },
        });
      }
    });
  }

  addNewsArticle(newsArticle: NewsArticle) {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        newsArticles: [...this.state.project.newsArticles, newsArticle],
      },
    });
  }

  removeImage(imageUrl: string) {
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
  }

  removeWikipediaArticle(wikipediaArticle: WikipediaArticle) {
    const filteredArticles = this.state.project.wikipediaArticles.filter(
      (article) => article !== wikipediaArticle
    );
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        wikipediaArticles: [...filteredArticles],
      },
    });
  }

  removeWikipediaSection(
    wikipediaArticle: WikipediaArticle,
    wikipediaSection: WikipediaSection
  ) {
    const changedArticle = this.state.project.wikipediaArticles.find(
      (article) => article === wikipediaArticle
    );

    if (changedArticle) {
      this.state.project.wikipediaArticles.map((article) => {
        this.setState({
          ...this.state,
          project: {
            ...this.state.project,
            wikipediaArticles: [
              ...this.state.project.wikipediaArticles,
              {
                ...changedArticle!,
                ...article.sections.filter(
                  (section) => section !== wikipediaSection
                ),
              },
            ],
          },
        });
      });
    }
  }

  removeNewsArticle() {}

  render() {
    return (
      <ProjectContext.Provider
        value={{
          projects: this.state.projects,
          project: this.state.project,
          addImage: this.addImage,
          addWikipediaArticle: this.addWikipediaArticle,
          addWikipediaSection: this.addWikipediaSection,
          addNewsArticle: this.addNewsArticle,
          removeImage: this.removeImage,
          removeWikipediaArticle: this.removeWikipediaArticle,
          removeWikipediaSection: this.removeWikipediaSection,
          removeNewsArticle: this.removeNewsArticle,
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
