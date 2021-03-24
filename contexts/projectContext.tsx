import { Component, createContext } from "react";

interface ProjectState extends Project {
  addProject: () => void;
  removeProject: () => void;
  addImage: () => void;
  addWikipediaArticle: () => void;
  addWikipediaSection: () => void;
  addNewsArticle: () => void;
  removeImage: () => void;
  removeWikipediaArticle: () => void;
  removeWikipediaSection: () => void;
  removeNewsArticle: () => void;
}

interface Project {
  title: string;
  description?: string;
  images?: Images[];
  wikipeda?: WikipediaArticle[];
  article?: Article[];
}

interface Images {
  imageUrl: string;
}

interface WikipediaArticle {
  section: WikipediaSection[];
}

interface WikipediaSection {
  title: string;
  content: string;
}

interface Article {
  title: string;
  linkUrl: string;
  imageUrl: string;
  introduction: string;
  body: string;
  author: string;
  date: string;
}

export const ProjectContext = createContext<ProjectState>({
  title: "",
  addProject: () => {},
  removeProject: () => {},
  addImage: () => {},
  addWikipediaArticle: () => {},
  addWikipediaSection: () => {},
  addNewsArticle: () => {},
  removeImage: () => {},
  removeWikipediaArticle: () => {},
  removeWikipediaSection: () => {},
  removeNewsArticle: () => {},
});

export default class ProjectProvider extends Component<{}, Project> {
  state: Project = {
    title: "",
  };

  addProject() {}
  removeProject() {}
  addImage() {}
  addWikipediaArticle() {}
  addWikipediaSection() {}
  addNewsArticle() {}
  removeImage() {}
  removeWikipediaArticle() {}
  removeWikipediaSection() {}
  removeNewsArticle() {}

  render() {
    return (
      <ProjectContext.Provider
        value={{
          title: this.state.title,
          addProject: this.addProject,
          removeProject: this.removeProject,
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
