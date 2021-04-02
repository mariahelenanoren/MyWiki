import React, { Component, createContext } from "react";
import { getProjects } from "../helper";
import { ProjectItem } from "./ProjectContext";

interface ContextState extends ProjectListState {
  addProject: (project: ProjectItem) => void;
  removeProject: (project: ProjectItem) => void;
}

interface ProjectListState {
  projects: ProjectItem[];
}

export const ProjectListContext = createContext<ContextState>({
  projects: [],
  addProject: () => {},
  removeProject: () => {},
});

export default class ContextProvider extends Component<{}, ProjectListState> {
  state: ProjectListState = {
    projects: [],
  };

  componentDidMount() {
    getProjects().then((result) => {
      this.setState({
        projects: [...result],
      });
    });
  }

  addProject = (project: ProjectItem) => {
    this.setState({ projects: [...this.state.projects, project] });
  };

  removeProject = (project: ProjectItem) => {
    const newList = this.state.projects.filter(
      (projects) => projects !== project
    );
    this.setState({ projects: [...newList] });
  };

  render() {
    return (
      <ProjectListContext.Provider
        value={{
          projects: this.state.projects,
          addProject: this.addProject,
          removeProject: this.removeProject,
        }}
      >
        {this.props.children}
      </ProjectListContext.Provider>
    );
  }
}
