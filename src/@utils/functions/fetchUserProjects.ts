import { Project } from "../../types/types";
import apiClient, { API_URI } from "../http-common/http-common";

const fetchUserProjects = async (
  userId: number = 4,
  query: object
): Promise<Project[] | undefined> => {
  try {
    const response = await apiClient.get(
      `${API_URI}/api/v1/user/${userId}/project`,
      {
        params: query,
      }
    );

    if (response.status === 200) {
      return response.data.projects as Project[];
    }
  } catch (error) {
    console.error(error);

    return [];
  }
};

export default fetchUserProjects;
