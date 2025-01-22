import { User } from "../../types/types";
import apiClient, { API_URI } from "../http-common/http-common";

const fetchUserById = async (userId: number): Promise<User | undefined> => {
  try {
    const userResponse = await apiClient.get(
      `${API_URI}/api/v1/user/${userId}`
    );

    if (userResponse.status === 200) {
      return userResponse.data.user;
    }
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export default fetchUserById;
