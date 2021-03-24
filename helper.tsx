import AsyncStorage from "@react-native-async-storage/async-storage";
import { unsplashKey } from "./key";
import { ProjectItem } from "./contexts/projectContext";

interface Data {
  id?: string;
  keyword?: string;
}

export const getProjects = async () => {
  try {
    const projects = (await AsyncStorage.getItem("projects")) || "[]";
    const parsedProjects: ProjectItem[] | [] = JSON.parse(projects);
    return parsedProjects;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveProject = async (project: ProjectItem) => {
  try {
    const projects = (await AsyncStorage.getItem("projects")) || "[]";
    const parsedProjects = JSON.parse(projects);
    await AsyncStorage.setItem(
      "projects",
      JSON.stringify(parsedProjects.append(project))
    );
  } catch (error) {
    console.log(error);
  }
};

export async function getImages(keyword: string, page: number) {
  const axios = require("axios").default;
  const formattedSearchTerm = formatQuery(keyword);
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?per_page=18&page=${page}&client_id=${unsplashKey}&query=${formattedSearchTerm}`
    );
    return response.data.results;
  } catch (error) {
    return error;
  }
}

export async function getWikipediaSections(keyword: string) {
  const axios = require("axios").default;
  const formattedSearchTerm = formatQuery(keyword);
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${formattedSearchTerm}&prop=sections`
    );
    return response.data.parse.sections;
  } catch (error) {
    return error;
  }
}

function formatQuery(searchTerm: string) {
  const formattedSearchTerm = searchTerm.split(" ").join("%20");
  return formattedSearchTerm;
}
