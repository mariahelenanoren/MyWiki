import AsyncStorage from "@react-native-async-storage/async-storage";

export const colorPalette = {
  primaryColor: "#00B2FF",
  secondaryColor: "#F6F6F6",
  borderColor: "#CBCBCB",
  secondaryTextColor: "#828282",
};

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
