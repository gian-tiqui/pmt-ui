import { Project } from "../../types/types";
import apiClient, { API_URI } from "../http-common/http-common";

const fetchProjectById = async (
  id: number | undefined
): Promise<Project | undefined> => {
  if (!id) return;

  try {
    const response = await apiClient.get(`${API_URI}/api/v1/project/${id}`);

    if (response.status === 200) {
      return response.data.project as Project;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default fetchProjectById;
