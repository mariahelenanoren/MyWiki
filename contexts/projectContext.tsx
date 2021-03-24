import { Component, createContext } from "react";
import { getProjects } from "../helper";

interface ContextState extends ProjectState {
  project: ProjectItem[];
  addProject: (project: ProjectItem) => void;
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

interface ProjectState {
  project: ProjectItem[];
}

export interface ProjectItem {
  title: string;
  description?: string;
  images?: Images[];
  wikipediaArticle?: WikipediaArticle[];
  newsArticle?: NewsArticle[];
}

interface Images {
  imageUrl: string;
}

export interface WikipediaArticle {
  title: string;
  section: WikipediaSection[];
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
  project: [],
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

export default class ProjectProvider extends Component<{}, ProjectState> {
  state: ProjectState = {
    project: [],
  };

  componentDidMount() {
    const projectResponse = async () => {
      const response = await getProjects();
      this.setState({ project: [...response] });
    };
    projectResponse();
  }

  addProject(project: ProjectItem) {
    this.setState({
      project: [...this.state.project, project],
    });
  }
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
          project: this.state.project,
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
