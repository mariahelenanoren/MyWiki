import AsyncStorage from "@react-native-async-storage/async-storage";
import { unsplashKey } from "./key";
interface Project {
  title: string;
  description: string;
  images: Data;
  wikipedia: Data;
  news: Data;
}

interface Data {
  id?: string;
  keyword?: string;
}

export const getProjects = async () => {
  try {
    const projects = (await AsyncStorage.getItem("projects")) || "[]";
    const parsedProjects: Project[] | [] = JSON.parse(projects);
    return parsedProjects;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveProject = async (project: Project) => {
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
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?per_page=18&page=${page}&client_id=${unsplashKey}&&query=${keyword}`
    );
    return response.data.results;
  } catch (error) {
    return error;
  }
}
